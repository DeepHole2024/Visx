import { Point } from '@vx/point';

export default function localPoint(nodeOrEvent, maybeEvent) {
  // called with no args
  if (!nodeOrEvent) return;

  let node = nodeOrEvent;
  let event = maybeEvent;

  // called with localPoint(event)
  if (nodeOrEvent.target) {
    event = nodeOrEvent;

    // set node to targets owner svg
    node = event.target.ownerSVGElement;

    // find the outermost svg
    while (node.ownerSVGElement) {
      node = node.ownerSVGElement;
    }
  }

  // default to mouse event
  let { clientX, clientY } = event;

  // support touch event
  if (event.changedTouches) {
    clientX = event.changedTouches[0].clientX;
    clientY = event.changedTouches[0].clientY;
  }

  // calculate coordinates from svg
  if (node.createSVGPoint) {
    let point = node.createSVGPoint();
    point.x = clientX;
    point.y = clientY;
    point = point.matrixTransform(node.getScreenCTM().inverse());
    return new Point({
      x: point.x,
      y: point.y,
    });
  }

  // fallback to calculating position from non-svg dom node
  const rect = node.getBoundingClientRect();
  return new Point({
    x: clientX - rect.left - node.clientLeft,
    y: clientY - rect.top - node.clientTop,
  });
}
