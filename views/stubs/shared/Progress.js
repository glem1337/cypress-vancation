import { Progress } from 'antd';

const ProgressWrap = () => (
  <div className="main-progress-wrap">
    <Progress percent={26} />
    <span className="main-progress-txt">
      completed
    </span>
  </div>
);

export default ProgressWrap;
