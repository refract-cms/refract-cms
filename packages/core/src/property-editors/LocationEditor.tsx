import * as React from 'react';
import { PropertyEditorProps } from '../properties/property-editor-props';
import { Location } from '../location/location.model';

export default () => (props: PropertyEditorProps<Location>) => {
  const value: Location = props.value || {
    lat: 0,
    lng: 0
  };
  const { lat, lng } = value;
  return (
    <div>
      <input
        value={value.lng}
        onChange={e =>
          props.setValue({
            lat,
            lng: parseInt(e.target.value, 10) || 0
          })
        }
      />
      <input
        value={value.lat}
        onChange={e =>
          props.setValue({
            lng,
            lat: parseInt(e.target.value, 10) || 0
          })
        }
      />
    </div>
  );
};
