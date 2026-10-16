/* The worlds of the recorded runs: Gymnasium's Pendulum-v1 and MountainCarContinuous-v0, as the Lab draws and
   describes them. Their physics run in the deep trainer (lab/deep/worlds.js): the page plays back what it recorded,
   or trains it again in a Worker. (CartPole's recordings use the Lab's own CartPole, envs/control.js, which also
   trains live.) */
(function (RL) {
  "use strict";
  const lab = (RL.lab = RL.lab || {});

  // ---- Pendulum: swing a weak motor's pendulum up and hold it upright ----
  // A state is (θ, θ̇), with θ = 0 upright; the action is a torque in [−2, 2], too weak to lift the pendulum straight up:
  // it must swing. Every step pays −(θ² + 0.1 θ̇² + 0.001 u²), so 0 is the best possible; episodes last 200 steps.
  lab.pendulum = function () {
    return {
      name: "pendulum", key: "pendulum", kind: "pendulum", title: "Pendulum", continuousActions: { lo: -2, hi: 2, unit: 1 },
      maxSteps: 200, valueRange: 1000, recorded: true, actionWord: "torque",
      describe: (s, a) => (a !== undefined ? `torque ${a < 0 ? "−" : "+"}${Math.abs(a).toFixed(2)}` : "the pendulum"),
    };
  };
  lab.worlds.pendulum = () => lab.pendulum();

  // ---- Continuous Mountain Car: swing a weak car out of a valley ----
  // A state is (x, v): the position on [−1.2, 0.6] and the speed, at most 0.07 either way. The action is a force in
  // [−1, 1], too weak to drive up the right hill from rest: the car must rock back and forth to build speed. Every
  // step costs 0.1 a²; reaching the flag at x = 0.45 pays 100 and ends the episode; at most 999 steps. A car that never
  // finds the flag learns that the cheapest thing is to do nothing, and ends near 0.
  lab.mountainCarContinuous = function () {
    return {
      name: "mountain-car-continuous", key: "mountain-car-continuous", kind: "hillcar", title: "Continuous Mountain Car", continuousActions: { lo: -1, hi: 1, unit: 1 },
      maxSteps: 999, valueRange: 100, recorded: true, actionWord: "force",
      describe: (s, a) => (a !== undefined ? `force ${a < 0 ? "−" : "+"}${Math.abs(a).toFixed(2)}` : "the car"),
    };
  };
  lab.worlds["mountain-car-continuous"] = () => lab.mountainCarContinuous();
})(globalThis.RL = globalThis.RL || {});
