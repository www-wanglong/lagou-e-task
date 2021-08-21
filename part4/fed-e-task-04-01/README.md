## 简答



#### 1. 请简述 React 16 版本中初始渲染的流程

##### 1.1 创建React元素
JSX被Babel编译为React.createElement方法的调用，调用之后返回的就是 ReactElement
##### 1.2 render阶段
负责创建Fiber数据结构并为Fiber节点打标记，标记当前Fiber节点要进行的DOM操作。

需要的数据：element( ReactElement的返回值)、container（渲染容器）、callback（渲染完成执行的回调函数）

返回：render方法第一个参数的真实DOM对象

- 将子树渲染都容器中（初始化 Fiber数据结构： 创建fiberRoot 及 rootFiber）
  - legacyCreateRootFromDOMContainer： 创建 根节点对应的fiber对象
  - 获取 fiber root对象
  - 改变callback函数中的this指向，使其指向 render 方法第一个参数的真实DOM对象
  - updateContainer： 计算任务的过期时间，再根据任务过期时间创建 Update任务
    - enqueueUpdate（将任务存放与任务队列中）
    - scheduleWork （调度和更新rootFiber）
      - performSyncWorkOnRoot: 进入render阶段，构建 workInProgress Fiber对象
        - prepareFreshStack: 根据 currentFiber树中的RootFiber,构建 workInProgressFiber（全局变量） 树及rootFiber
          - createWorkInProgress：构建workInProgress Fiber 树中的 rootFiber，构建完成后替代 current fiber
            - createFiber： 创建fiber对象
            - 返回构建好的workInProgress Fiber对象
        - workLoopSync：以同步的方式构建Fiber对象
          - performUnitOfWork
            - beginWork：从父到子，构建Fiber节点对象
              -  updateHostRoot： 找出HostRoot的子 ReactElement, 并为其构建 Fiber 对象
                - reconcileChildren： 构建子节点 fiber 对象
                  -  mountChildFibers：为当前节点创建的Fiber对象添加子级 Fiber 对象
            - completeUnitOfWork：从子到父，构建其余节点Fiber对象
              - completeWork：创建节点真实 DOM 对象并将其添加到 stateNode 属性中， 返回子级
                - createInstance： 创建节点实例对象
                - appendAllChildren：将所有的子级追加到父级中
                - 为 Fiber 对象添加 stateNode 属性
              - 如果子级存在 再重新执行 performUnitOfWork 构建子级，直到不存在
              -  构建 effect 链表结构
              -  获取下一个同级 Fiber 对象
                -  如果下一个同级 Fiber 对象存在，返回下一个同级 Fiber 对象
                -  否则退回父级 知道遍历完
              - 更新 workInProgressRootExitStatus 的状态为 已完成
        - finishSyncRender： 进入 commit 阶段

##### 1.3 commit阶段
根据Fiber节点标记（effectTag）进行相应的DOM操作
finishSyncRender
  - commitRootImpl
    - commitBeforeMutationEffects: 处理类组件的 getSnapShotBeforeUpdate 生命周期函数
    - commitMutationEffects： 根据effectTag执行DOM操作
      - commitPlacement： 针对该节点及子节点进行DOM插入操作
      - commitWork：更新 DOM
      - commitDeletion： 删除 DOM
    - commitLayoutEffects：
      - commitLayoutEffectOnFiber：调用生命周期函数和钩子函数


　

#### 2. 为什么 React 16 版本中 render 阶段放弃了使用递归

采用递归导致，任务一旦开始进行就无法中断，如果应用中组件的数量庞大，主线程被长时间占用，知道整个 `Virtual DOM`树比对更新完成之后主线程才被释放，主线程才能执行其他任务。这就导致一些用户交互、动画等任务无法立即执行，页面就会产生卡顿，影响体验差。
　

#### 3. 请简述 React 16 版本中 commit 阶段的三个子阶段分别做了什么事情

- 执行DOM操作前`before mutation`
主要处理类组件的 `getSnapShotBeforeUpdate`生命周期函数
- 执行DOM中 `mutation`
将 `workInProgress Fiber`树变成`current Fiber`树。
- 执行DOM后 `layout`
  调用生命周期函数（componentDidMount、componentDidUpdate）和钩子函数(渲染完之后的回调函数)


　

#### 4. 请简述 workInProgress Fiber 树存在的意义是什么
React中会同时存在两颗Fiber，一个是先是在页面的fiber树（current Fiber），另一个则是在内存中构建的fiber树（workInProgress Fiber树）。

workInProgress Fiber树就是即将要显示在页面中的Fiber树，当这颗Fiber树构建完成之后，React会使用它直接替换 页面的current fiber树达到快速更新DOM的目的，因为workInProgress Fiber树是在内存中构建的，所以构建的速度是非常快的。

一旦 workInProgress Fiber树在屏幕上呈现，就变成current Fiber树。

因此 workInProgress Fiber 树存在是为了提升react的性能。





　

　