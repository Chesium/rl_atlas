/* One seed per request; terminating the worker cancels pending work. */
onmessage = ({ data }) => {
  try { postMessage({ id: data.id, result: RL.flows.experiment(data.settings) }); }
  catch (e) { postMessage({ id: data.id, error: e.message }); }
};
