import React from 'react';
import Show from '../components/Show';
import Radar from '../sandboxes/vx-radar/Example';
import RadarSource from '!!raw-loader!../sandboxes/vx-radar/Example';

export default () => {
  return (
    <Show
      margin={{ top: 0, right: 0, bottom: 50, left: 0 }}
      component={Radar}
      title="Radar"
      codeSandboxDirectoryName="vx-radar"
    >
      {RadarSource}
    </Show>
  );
};
