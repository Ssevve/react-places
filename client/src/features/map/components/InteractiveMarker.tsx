import L from 'leaflet';
import { ForwardedRef, forwardRef, useImperativeHandle, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { Marker, MarkerProps } from 'react-leaflet';

interface InteractiveMarkerProps extends MarkerProps {
  iconOptions?: L.DivIconOptions;
}

export const InteractiveMarker = forwardRef(
  (
    { children, iconOptions, ...rest }: InteractiveMarkerProps,
    forwardedRef: ForwardedRef<L.Marker | undefined>,
  ) => {
    const [markerInstance, setMarkerInstance] = useState<L.Marker | undefined>();

    useImperativeHandle(forwardedRef, () => markerInstance);

    return (
      <>
        {useMemo(
          () => (
            <Marker
              {...rest}
              ref={(node) => setMarkerInstance(node || undefined)}
              icon={L.divIcon({ ...iconOptions, className: '', iconSize: undefined })}
            />
          ),
          // eslint-disable-next-line react-hooks/exhaustive-deps
          [],
        )}
        {markerInstance && markerInstance.getElement()
          ? createPortal(children, markerInstance.getElement()!)
          : null}
      </>
    );
  },
);
