<a href="https://ant.design/components/progress/" title="More details about Ant progress">More details here</a>
<br />
<br />
<br />
<h3>When To Use</h3>
<p>If it will take a long time to complete an operation, you can use <mark>Progress</mark> to show the current progress and status.</p>
<ul>
  <li>When an operation will interrupt the current interface, or it needs to run in the background for more than 2 seconds.</li>
  <li>When you need to display the completion percentage of an operation.</li>
</ul>
<br />
<br />
<h3>Progress bar</h3>
<p>A standard progress bar.</p>

```js
  import { Progress } from 'antd';

  <div>
    <Progress percent={30} size="small" />
    <Progress percent={50} size="small" status="active" />
    <Progress percent={70} size="small" status="exception" />
    <Progress percent={100} size="small" />
    <Progress percent={50} size="small" showInfo={false} />
  </div>
```

<br />
<h3>Circular progress bar</h3>
<p>A circular progress bar.</p>

```js
  import { Progress } from 'antd';
  
  <div>
    <Progress type="circle" percent={75} style={{ marginRight: 16 }} />
    <Progress type="circle" percent={70} status="exception" style={{ marginRight: 16 }} />
    <Progress type="circle" percent={100} />
  </div>
```
