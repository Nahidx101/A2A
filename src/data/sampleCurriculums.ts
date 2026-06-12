/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { A2ACurriculum } from "../types";

export const sampleCurriculums: A2ACurriculum[] = [
  {
    id: "sample-algebra-dynamics",
    chapterTitle: "The Physics of Rates: From Constant Stepping to Compound Curvatures",
    originalOverview: "This original chapter covered standard algebra textbook topics: graphing lines, slope-intercept equations, quadratic roots, vertex formulas, and compound interest models, heavily mixed with word problems of cars moving, throwing balls, and bank accounts.",
    levels: [
      {
        levelNumber: 1,
        levelName: "Linear Operations and Scalar Slopes",
        phase1: {
          atomicConcepts: [
            {
              id: "l1-ac1",
              conceptName: "Absolute Difference (Interval)",
              socraticQuestion: "If we compare two separate states of a changing value, how do we capture the sheer distance between them without caring what names we gave those states?",
              honestReasoning: [
                "Suppose we measure temperature on Monday in Celsius and get 15. On Tuesday we get 22. We could list them as separate numbers, but listing individual details does not reveal how they connect. To capture change, we need to know what separate states share.",
                "Let's represent them on a simple line. State A resides at 15. State B resides at 22. We could count the space between them: 16, 17, 18, 19, 20, 21, 22. That is 7 steps.",
                "Wait, what if the value drops? From 22 down to 15? The count is still 7 steps, but the direction is complementary. If we arbitrarily subtract: 15 - 22, we get -7. If we subtract: 22 - 15, we get 7.",
                "We realize that the fundamental distance—the absolute variation—is the basic subtraction of one marker from another. It represents the size of the gap. If we have states s1 and s2, the intervals are their differences: Delta s = s2 - s1.",
                "Therefore, the interval measurements is the basic operator of comparison. It does not measure what the states are, but what space separates them."
              ],
              formalDefinition: "For any two distinct real values x1 and x2 describing states of a single quantity, the absolute interval (or difference) is the quantity Delta x = x2 - x1, representing the directed scalar distance required to transition from the initial state to the final state.",
              scaffolding: [
                {
                  type: "numerical_sequence",
                  title: "Interval Differences Sequence",
                  content: "State index [0, 1, 2, 3...] yields Values [12, 19, 26, 33...]. Intervals between adjacent states are: (19 - 12 = 7), (26 - 19 = 7), (33 - 26 = 7). The step interval remains static."
                }
              ]
            },
            {
              id: "l1-ac2",
              conceptName: "Uniform Temporal Stepping",
              socraticQuestion: "How do we prove that a value is changing in a reliable, unhurried rhythm rather than erratic bursts?",
              honestReasoning: [
                "Assume a quantity is growing. We check it at noon: 5. We check it at 3 PM: 11. We check it at 4 PM: 13. Is the rate steady?",
                "Wait, the time periods are unequal. From 12:00 to 15:00 is 3 hours (increment is 6). From 15:00 to 16:00 is 1 hour (increment is 2).",
                "If we check only the values (5 to 11 is +6, 11 to 13 is +2), it looks variable. But if we break the time intervals down to equal slices of 1 hour, we see: hour 1 (+2), hour 2 (+2), hour 3 (+2), hour 4 (+2).",
                "We realize we cannot talk about steady growth without establishing a baseline of uniform steps in our sampling variable. If we divide the independent variable into perfect, uniform intervals (Delta x = c), the dependent intervals (Delta y) must match each other uniformly.",
                "This guarantees that the change is locked to a steady scalar scale. The sequence must proceed predictably."
              ],
              formalDefinition: "Uniform stepping is the state where, for any equal divisions of the independent variable domain (Delta x1 = Delta x2), the resulting intervals of the dependent variable are strictly congruent (Delta y1 = Delta y2).",
              scaffolding: [
                {
                  type: "coordinate_table",
                  title: "Uniform Independent Sampling",
                  content: "| Independent Input (x) | Dependent Result (y) | Interval (Delta y) |\n|---|---|---|\n| 0 | 5 | - |\n| 1 | 8 | +3 |\n| 2 | 11 | +3 |\n| 3 | 14 | +3 |\n| 4 | 17 | +3 |"
                }
              ]
            },
            {
              id: "l1-ac3",
              conceptName: "The Ratio of Displacements (Slope)",
              socraticQuestion: "If we cannot guarantee that our measurements occur at perfect, equal steps, how do we find the unique signature of steady rate change?",
              honestReasoning: [
                "Suppose we measure random points: (x=1, y=7) and (x=4, y=16). The step in x is 3, the step in y is 9. Another pair: (x=10, y=34). The step in x from 4 to 10 is 6, the step in y from 16 to 34 is 18.",
                "How do we equate '9 steps of y for 3 steps of x' with '18 steps of y for 6 steps of x'?",
                "We could divide: 9 / 3 = 3. And 18 / 6 = 3. Both yield exactly 3 units of vertical motion for every 1 unit of horizontal motion.",
                "Let us test a wrong path: what if we subtracted them instead? (9 - 3 = 6) and (18 - 6 = 12). The subtraction yields different values, so it does not capture the invariant characteristic of the change.",
                "Thus, the only comparison that remains constant across arbitrary measuring boundaries is the ratio of the change in the dependent variable to the change in the independent variable. We name this scale invariant ratio the 'slope': m = Delta y / Delta x."
              ],
              formalDefinition: "The slope (m) of a linear system is the invariant ratio of the displacement of the dependent variable to the corresponding displacement of the independent variable over any non-zero interval: m = (y2 - y1) / (x2 - x1) = Delta y / Delta x.",
              scaffolding: [
                {
                  type: "verbal_description",
                  title: "Mental Construction of a Constant Ratio Plane",
                  content: "Picture a straight path climbing a steady hill. If you walk forward any horizontal distance, say 10 meters, you rise exactly 4 meters. If you walk forward 5 meters (half the distance), you rise exactly 2 meters (half the rise). No matter how small or large your horizontal step, the quotient of your rise divided by your run is always exactly 0.4. This straightness is defined by the absolute preservation of this ratio at every single point."
                }
              ]
            }
          ]
        },
        phase2: {
          problems: [
            { id: 1, problemText: "Given a discrete mapping where the independent variable x changes by constant steps of 3, and the output y changes by constant steps of -5, calculate the exact change in y when x increases by 18.", logicalCore: "Proportional scaling of first-order finite differences." },
            { id: 2, problemText: "Determine the constant value r such that the set of ordered pairs S = {(2, 9), (5, -3), (r, -15)} belong to the same first-order linear space.", logicalCore: "Collinearity of three coordinate pairs in R^2." },
            { id: 3, problemText: "A function f satisfying f(x + h) - f(x) = k * h for all real x and h has f(2) = 11 and f(5) = 26. Evaluate k and express f(0) as a clean integer.", logicalCore: "Abstract linear form from functional difference equation." },
            { id: 4, problemText: "Let a sequence of values hold the relation x_{n+1} = x_n - 4.5. If x_4 = 17, determine the value of x_100.", logicalCore: "Arithmetic progression behavior over large step counts." },
            { id: 5, problemText: "For a linear function containing points (p, q) and (u, v) where p != u, prove that swapping the input coordinates to scale the slope yields m_new = -m_old.", logicalCore: "Symmetric properties of the fraction gradient structure." },
            { id: 6, problemText: "In the coordinate system where y is defined as containing points (c, 2c + 5), write the coordinate pairs for when the independent parameter step size represents twice the absolute value of the offset index.", logicalCore: "Algebraic mapping with parameterized variable steps." },
            { id: 7, problemText: "Find the intersection point (x_i, y_i) of two linear systems: the first mapping contains the interval pairs (0, 4) and (2, 8), and the second contains (1, 10) and (4, 1).", logicalCore: "Simultaneous linear algebraic systems solution." },
            { id: 8, problemText: "An abstract sequence has first-order differences d_n = y_{n+1} - y_n. If d_n = 7 for all integers n, and y_12 = 80, establish the precise formula for y_n in terms of n.", logicalCore: "First-order discrete differential equation with boundary state." },
            { id: 9, problemText: "Let f(x) be a linear function. Show that if f(a), f(b), f(c) form an arithmetic progression, then a, b, and c must also form an arithmetic progression given the slope is non-zero.", logicalCore: "Preservation of arithmetic sequences under linear mapping functions." },
            { id: 10, problemText: "Solve for variables a and b if the linear relation ax + by = 24 maps the coordinate differences such that Delta y / Delta x = -3/4, and the point (4, 3) satisfies the constraint.", logicalCore: "Implicit linear form parameter determination from gradient and point." }
          ]
        },
        phase3: {
          problems: [
            { id: 1, scenario: "A fluid storage reservoir is emptied through a static discharge nozzle at a steady volumetric state.", constraints: ["Rate of discharge is strictly consistent.", "The initial volume at index hour 2 is 1400 cubic meters.", "The volume at index hour 5 is 800 cubic meters."], problemText: "Express the exact volume of remaining fluid in terms of the hour index, find the exact discharge rate, and calculate the time step when the reservoir reaches perfect vacuum." },
            { id: 2, scenario: "A solid steel block expands lengthwise in direct proportion to the uniform thermal steps of a surrounding furnace.", constraints: ["The length increases linearly.", "At 100 degrees, length is 50.04 centimeters.", "At 300 degrees, length is 50.12 centimeters."], problemText: "Formulate the linear relation between temperature T and steel length L, and compute the hypothetical length when thermal action is reduced to absolute zero (-273 degrees)." },
            { id: 3, scenario: "A high-altitude meteorological probe records ambient air pressure as it rises at a steady velocity.", constraints: ["Pressure drop is linear with altitude.", "At 1500 meters altitude, pressure is 840 millibars.", "At 4500 meters altitude, pressure is 570 millibars."], problemText: "Determine the uniform pressure decrease per meter of ascension, and state the exact pressure reading at sea level (0 meters)." },
            { id: 4, scenario: "A manufacturer records total daily operating cost as a linear relation of the volume of mechanical output components produced.", constraints: ["The baseline fixed cost remains constant.", "Producing 200 components requires $4,500.", "Producing 500 components requires $9,000."], problemText: "Isolate the fixed daily capital required before any component is built, and state the marginal cost addition required to create a single mechanical component." },
            { id: 5, scenario: "A telecommunications cable routes signals over a distance where resistance rises linearly with cable span.", constraints: ["At 5 kilometers, resistance is 24 ohms.", "At 12 kilometers, resistance is 52 ohms."], problemText: "Determine the resistance of a 40-kilometer line, and derive the baseline resistance representing contact points at 0 kilometers." },
            { id: 6, scenario: "Two chemical solutions are combined in a sealed reactor, producing a gas byproduct at a steady hourly volume rate.", constraints: ["Gas collection is cumulative.", "At hour 1.5, the container holds 45 liters.", "At hour 4.0, the container holds 110 liters."], problemText: "Deduce the initial mass of gas existing prior to reactor triggering, and determine the exact hour mark when the collection volume will hit 200 liters." },
            { id: 7, scenario: "An automated loader deposits loose aggregate into a shipping hopper at a constant rate.", constraints: ["The receiving scale records empty scale state before loading.", "At 12 minutes, total weight is 18 tons.", "At 20 minutes, total weight is 28 tons."], problemText: "Establish the loading speed in tons per minute, and check if the initial empty hopper had any residual material weight." },
            { id: 8, scenario: "A deep thermal spring pumps pressurized hot water to the surface where temperature drops as depth decreases.", constraints: ["Temperature changes linearly with depth.", "At 800 meters depth, temperature is 64 degrees Celsius.", "At 150 meters depth, temperature is 25 degrees Celsius."], problemText: "Calculate the temperature rate of change per 100 meters of depth, and map the projected thermal state at surface point (0 meters)." },
            { id: 9, scenario: "An elevator is lowered into a subterranean mine shaft at a constant vertical speed.", constraints: ["Lowering occurs strictly linearly.", "At 20 seconds, depth is -60 meters.", "At 55 seconds, depth is -165 meters."], problemText: "Express depth as a function of elapsed seconds, and find the location index of the elevator cabin at second 0." },
            { id: 10, scenario: "A carbon emission filter gradually loses particulate accumulation capacity as gas flows through.", constraints: ["The drop in filter capacity is strictly linear to cumulative gas cubic units processed.", "Initial filter capacity is 98 percent.", "After 12,000 cubic meters of gas, filter capacity drops to 74 percent."], problemText: "Find the rate of capacity degradation per 1,000 cubic meters of gas, and find the total gas volume capacity limit when filtering efficacy drops to exactly 50 percent." }
          ]
        }
      },
      {
        levelNumber: 2,
        levelName: "Quadratic Fields and Accelerated Rates",
        axiomaticBridge: {
          previousLevelConclusion: "Level 1 concluded that changing systems can be fully described, bounded, and predicted using a first-order constant difference ratio (slope) where equal steps of input result in identical, unchanging steps of output.",
          limitationOrEdgeCase: "However, this linear model completely collapses when we observe accelerating systems—such as a falling stone, a spreading biological colony, or a decelerating vehicle. In these physical realities, checking the intervals between adjacent equal-time steps reveals that the steps of the output are themselves changing in size. If y is no longer steady, the first-order interval difference (Delta y) is not constant. Slope is no longer a single number, and L1 offers no math to describe what happens when the rate itself possesses a rate.",
          logicalInevitabilityOfNewConcept: "The only logical response is to analyze the difference of the differences. If the first-order difference (Delta y) varies, we must take the interval of those variations (Delta(Delta y)) to see if this second-order difference possesses a deeper, constant baseline. This leads us directly to the quadratic field, where the rate of change changes linearly, and the acceleration is the ultimate invariant constant."
        },
        phase1: {
          atomicConcepts: [
            {
              id: "l2-ac1",
              conceptName: "The Second-Order Difference (Acceleration)",
              socraticQuestion: "If our initial measurements show that our value changes by a different amount on every step, how do we find order in this apparent chaos?",
              honestReasoning: [
                "Assume we track an object's position over equal 1-second ticks. Second 0: 0. Second 1: 3. Second 2: 8. Second 3: 15. Second 4: 24.",
                "Let's look at the first-order differences (Delta y): from 0 to 3 is +3. From 3 to 8 is +5. From 8 to 15 is +7. From 15 to 24 is +9.",
                "The first-order difference is changing: it is 3, 5, 7, 9. The system does not have a slope in the Level 1 sense. It is accelerating. But how do we define this acceleration?",
                "Let's treat the differences themselves as a new sequence: D = {3, 5, 7, 9...}. What is the difference of this new sequence? That is the 'second difference' (Delta^2 y).",
                "Subtraction yields: 5 - 3 = +2; 7 - 5 = +2; 9 - 7 = +2. The change of the change is perfectly constant!",
                "Thus, we discover that even when first-order rates of change are unstable, their instability can be completely regularized by a constant second-order difference. We define this state as a quadratic system."
              ],
              formalDefinition: "The second-order difference Delta^2 y of a sequence y_n sampled at uniform intervals of x is defined as Delta(Delta y_n) = (y_{n+2} - y_{n+1}) - (y_{n+1} - y_n) = y_{n+2} - 2y_{n+1} + y_n.",
              scaffolding: [
                {
                  type: "coordinate_table",
                  title: "Second-order Difference Mapping",
                  content: "| Index x | Output y | First Diff (Delta y) | Second Diff (Delta^2 y) |\n|---|---|---|---|\n| 0 | 1 | - | - |\n| 1 | 4 | +3 | - |\n| 2 | 9 | +5 | +2 |\n| 3 | 16 | +7 | +2 |\n| 4 | 25 | +9 | +2 |"
                }
              ]
            },
            {
              id: "l2-ac2",
              conceptName: "Symmetrical Reversal (The Vertex)",
              socraticQuestion: "If a system is steadily losing its forward rate of change, what happens at the exact boundary when the rate crosses zero and becomes negative?",
              honestReasoning: [
                "Suppose a value increases but decelerates. First diff is +3, then +1, then what?",
                "If the second-order difference is a constant -2, the sequence of differences must be: +3, +1, -1, -3.",
                "Let's build the values from 0: Start at 0. Add 3 -> 3. Add 1 -> 4. Add -1 -> 3. Add -3 -> 0.",
                "The values go: 0, 3, 4, 3, 0. The maximum state is reached at 4 when the rate changes sign. Around this peak, the values are perfectly mirrored: 3 is on both sides, 0 is on both sides.",
                "Why is it symmetrical? Because the rate loses speed exactly as fast as it gains downward speed, dictated by the constant second-order operator. Symmetrical reversal is a logical necessity of constant second differences."
              ],
              formalDefinition: "The vertex of a quadratic function is the unique point where the first-order difference Delta y transitions through zero. It marks the axis of absolute reflective symmetry: f(x_v - d) = f(x_v + d) for all distances d.",
              scaffolding: [
                {
                  type: "numerical_sequence",
                  title: "Symmetric Deceleration Values",
                  content: "Input sequence x: [-2, -1, 0, 1, 2, 3, 4]. Output sequence y: [5, 8, 9, 8, 5, 0, -7]. The vertex resides at (0, 9), showing perfect reflection values surrounding it (8, 5, then diverging offset)."
                }
              ]
            }
          ]
        },
        phase2: {
          problems: [
            { id: 1, problemText: "Evaluate the unique quadratic function f(x) = ax^2 + bx + c satisfying f(0) = 4, f(1) = 7, and f(2) = 14.", logicalCore: "Solving for quadratic coefficients using systematic point mapping." },
            { id: 2, problemText: "For f(x) = 3x^2 - 12x + 19, prove algebraically that f(2 - d) = f(2 + d) for any real offset value d.", logicalCore: "Algebraic validation of the parabolic axis of symmetry." },
            { id: 3, problemText: "A discrete function y_n has constant second differences Delta^2 y = 6. If y_0 = 5 and y_1 = 8, calculate the value of y_5.", logicalCore: "Reconstructing quadratic sequences from second differences." },
            { id: 4, problemText: "Find the coordinates of the turning point (vertex) of the abstract system y = -2x^2 + 16x - 24, and state whether it represents a boundary ceiling or local basement floor.", logicalCore: "Extreme value and vertex coordinate identification." },
            { id: 5, problemText: "Solve the quadratic system 4x^2 - 20x + 25 = 0 purely by factoring it into a square of a single binomial. State the algebraic meaning of the singular root.", logicalCore: "Analysis of double roots and zero-discriminant geometry." },
            { id: 6, problemText: "Find the values of k for which the quadratic mapping y = x^2 - kx + 16 touches the horizontal axis (zero state) at exactly one point.", logicalCore: "Discriminant boundary conditions for real roots." },
            { id: 7, problemText: "Determine the intersection coordinates of the linear system y = 2x + 3 and the quadratic curve y = x^2 - x - 7.", logicalCore: "Simultaneous linear-quadratic coordinate systems solutions." },
            { id: 8, problemText: "If the roots of rx^2 + sx + t = 0 are r1 and r2, prove from the coefficients that their sum r1 + r2 is strictly -s/r and their product r1 * r2 is t/r.", logicalCore: "Vieta's formulas derivation from quadratic binomial multiplication." },
            { id: 9, problemText: "A sequence of first-differences d_n = y_{n+1} - y_n is described by d_n = 4n + 3. Solve for the second difference Delta^2 y_n.", logicalCore: "Evaluating second order differences of linear difference maps." },
            { id: 10, problemText: "Prove that for any quadratic mapping f(x) = ax^2 + bx + c, the difference quotient [f(x + h) - f(x)] / h is a linear function of x for any constant h != 0.", logicalCore: "First-order difference quotient linearization of quadratics." }
          ]
        },
        phase3: {
          problems: [
            { id: 1, scenario: "A heavy steel sphere is dropped into a dense deceleration gas chamber.", constraints: ["The position drops downward with constant acceleration.", "At second 1, depth is -5 meters.", "At second 3, depth is -45 meters."], problemText: "Deduce the acceleration constant, construct the exact quadratic formula describing position over time, and determine the exact second mark when depth reaches -125 meters." },
            { id: 2, scenario: "An agricultural compound optimizes crop volume yield based strictly on the density level of planting units.", constraints: ["The crop yield output follows quadratic decay due to crowding.", "Planting 10 units yields 500 kilograms.", "Planting 20 units yields 800 kilograms.", "Planting 40 units yields 800 kilograms."], problemText: "Find the quadratic yield formula, evaluate the density setting that achieves the absolute maximum yield potential, and identify the crowding point where yield drops to exactly zero." },
            { id: 3, scenario: "A high-precision optical mirror is ground so that its slope decreases linearly from the outer rim to the absolute center.", constraints: ["The horizontal cross section shape is parabolic.", "The center point sits at (0, 0).", "At horizontal distance 10 centimeters, depth is exactly 5 millimeters."], problemText: "Construct the quadratic depth equation, and calculate the mirror depth at horizontal distance 18 centimeters." },
            { id: 4, scenario: "A transit rail system decelerates a rapid cargo car to a perfect loading halt.", constraints: ["The position during braking is a quadratic decay curve.", "The car stops completely in exactly 12 seconds.", "The total braking distance traversed during those 12 seconds is 144 meters."], problemText: "Calculate the initial deceleration value, and find the distance remaining after the first 6 seconds of braking." },
            { id: 5, scenario: "A commercial power turbine generates electrical torque output relative to the variable spin frequency of its core.", constraints: ["The power output maps as a quadratic return curve.", "At 0 RPM, power is 0.", "At 200 RPM, power peak is reached at 400 kilowatts.", "At 400 RPM, power drops back to 0 due to safety governors."], problemText: "Derive the quadratic power function of RPM, and determine the exact spin frequency that yields exactly 300 kilowatts." },
            { id: 6, scenario: "A specialized arch supports a concrete bridge deck above a deep ravine.", constraints: ["The arch curve is quadratic.", "The arch spans 100 meters horizontally.", "The maximum height of the arch is 50 meters at the centerline span."], problemText: "Establish coordinate boundaries and formulate the height equation, then calculate the structural height support required at a distance of 15 meters from either outer horizontal bank." },
            { id: 7, scenario: "A high-voltage power transmission cable hangs suspended between two vertical grid towers.", constraints: ["The cable sag curve is treated as parabolic.", "The towers are spaced 200 meters apart.", "The cable height at the towers is 35 meters.", "The cable height at the absolute center is 15 meters."], problemText: "Construct the quadratic vertical deflection curve equation, and find the clear height above ground at horizontal distance 40 meters from the left tower." },
            { id: 8, scenario: "A thermal core element radiates heat energy such that temperature dissipation rates accelerate closer to the outer surface boundaries.", constraints: ["The interior thermal profile is a quadratic function of radius r.", "At core r=0, temperature is 1200 degrees Celsius.", "At surface boundary r=10 centimeters, temperature is 200 degrees Celsius."], problemText: "Formulate the thermal distribution equation T(r), and calculate the temperature at a depth index of r=5 centimeters." },
            { id: 9, scenario: "A liquid vortex is formed inside a rotating centrifuge cylinder, curving the fluid surface high against the cylinder walls.", constraints: ["The profile of the spinning fluid boundary is quadratic.", "The lowest point of the fluid curve is at center axis coordinate x=0 with height 10 centimeters.", "At a radial distance of x=6 centimeters, the fluid rises to 28 centimeters."], problemText: "Define the quadratic rising shape, and evaluate the fluid surface altitude index at radial distance x=10 centimeters." },
            { id: 10, scenario: "An automation drone adjusts thrust as it descends from a skyscraper pad.", constraints: ["Thrust output relative to remaining height forms a quadratic mapping.", "At altitude 100 meters, thrust is 40 units.", "At altitude 50 meters, thrust is 15 units.", "At altitude 10 meters, thrust is 7 units."], problemText: "Determine the quadratic coefficients of drone thrust, and find the minimum possible thrust projected by this mapping before ground impact." },
            { id: 11, scenario: "A chemical synthesizer experiences temperature variations during catalyst introduction.", constraints: ["The thermal history peaks quadratically over elapsed minutes.", "Initial temperature is 20 degrees.", "Peak temperature of 84 degrees occurs at minute 8."], problemText: "Establish the complete thermodynamic formula over time, and determine the minutes when temperature is exactly 52 degrees." },
            { id: 12, scenario: "An elastic cord is stretched, storing mechanical potential energy in non-linear proportion to the stretch distance.", constraints: ["Energy accumulation is quadratic.", "Stretching 2 centimeters stores 0.16 Joules.", "Stretching 5 centimeters stores 1.00 Joules."], problemText: "Verify the proportional constant, and determine the stretch length required to store exactly 4.00 Joules." },
            { id: 13, scenario: "A deep irrigation pipe discharges water such that the cross-sectional velocity profile of the internal stream decelerates near the pipe's rough walls.", constraints: ["Velocity profile is parabolic across the pipe diameter.", "Peak velocity of 4.5 meters per second occurs at center axis (r=0).", "Velocity is exactly 0 at the pipe wall boundary (r=15 millimeters)."], problemText: "Formulate the velocity function V(r), and evaluate velocity at r=10 millimeters from the center." },
            { id: 14, scenario: "A manufacturing array experiences tooling wear that increases over operational cycles.", constraints: ["Tool wear rate accelerates over cumulative cycles.", "Wear at cycle 1,000 is 0.05 percent.", "Wear at cycle 3,000 is 0.45 percent.", "Wear at cycle 5,000 is 1.25 percent."], problemText: "Formulate the quadratic wear function, and predict the precise operational cycle when tool failure occurs (defined as wear hitting 2.00 percent)." },
            { id: 15, scenario: "A solar reactor dome gathers ambient illumination on its reflective curved shell.", constraints: ["The reflective cross section curve is parabolic.", "The focus of the collection rays must target a receiver situated on the vertical axes of symmetry.", "The dome profile matches y = 0.05x^2."], problemText: "Calculate the exact vertical height coordinate of the focus point relative to absolute dome bottom." }
          ]
        }
      },
      {
        levelNumber: 3,
        levelName: "Exponential Scaling and Continuity Limits",
        axiomaticBridge: {
          previousLevelConclusion: "Level 2 established the quadratic field, illustrating that accelerating systems can be predicted by holding the second difference constant (Delta^2 y = c). This solved systems where rate change is dictated by an outside, constant physical force.",
          limitationOrEdgeCase: "However, the quadratic model fails when we examine biological reproduction, chemical cascade explosions, or capital compounding. In these systems, the size of the growth does not depend on an external constant force—it depends directly on the current volume of the growing element itself. More bacteria create more offspring; larger capital balances generate greater interest payments. This is not constant acceleration (L2) or constant stepping (L1); the rate of change is proportional to the state itself. Polynomial growth curves are completely left behind by this self-referential expansion.",
          logicalInevitabilityOfNewConcept: "To solve self-referential processes, we must introduce a system where the ratio of adjacent values is constant (y_{n+1} / y_n = r). This shifts us from arithmetic increments to geometric multipliers, laying the foundation for exponential scaling where growth continuously feeds back into itself. This creates a landscape defined by proportional compounding and asymptotic limits."
        },
        phase1: {
          atomicConcepts: [
            {
              id: "l3-ac1",
              conceptName: "Proportional Growth (The Multiplier)",
              socraticQuestion: "If a quantity grows faster the bigger it becomes, how do we write a mathematical rule that remains constant throughout this explosion?",
              honestReasoning: [
                "Suppose a cell divides in two every hour. Hour 0: 1. Hour 1: 2. Hour 2: 4. Hour 3: 8. Hour 4: 16.",
                "Let's look at the first differences (Delta y): 1, 2, 4, 8. They do not stay constant (L1 is failed).",
                "Let's look at the second differences (Delta^2 y): 1, 2, 4. They do not stay constant either (L2 is failed!). We could take third, fourth, or hundredth differences, and they would still escalate.",
                "We must look for a different constant. Let's divide adjacent values instead of subtracting them: 2/1 = 2; 4/2 = 2; 8/4 = 2; 16/8 = 2.",
                "The quotient is perfectly constant! This is a geometric multiplier. Every level depends on the previous level multiplied by this base: y_{n+1} = r * y_n.",
                "This multiplier is the invariant signature of self-referential systems."
              ],
              formalDefinition: "An exponential system is a mapping where the ratio of the dependent variable at sequential, equal steps of the independent variable remains strictly constant: y_{x+h} / y_x = b^h, where b is the constant growth base.",
              scaffolding: [
                {
                  type: "coordinate_table",
                  title: "Exponential Ratio Table",
                  content: "| Input x | Output y | Ratio (y_x / y_{x-1}) |\n|---|---|---|\n| 0 | 3 | - |\n| 1 | 9 | 3.0 |\n| 2 | 27 | 3.0 |\n| 3 | 81 | 3.0 |\n| 4 | 243 | 3.0 |"
                }
              ]
            },
            {
              id: "l3-ac2",
              conceptName: "The Continuous Limit (e)",
              socraticQuestion: "If we compound a growth rate more and more frequently—not just every year, but every hour, second, or instant—does the value blow up to infinity, or does it hit an invisible ceiling?",
              honestReasoning: [
                "Suppose we have 100% growth rate over 1 unit of time. If we compound once, we get: (1 + 1)^1 = 2.0.",
                "What if we compound twice (50% growth twice)? We get: (1 + 1/2)^2 = 1.5^2 = 2.25. It is larger.",
                "Compounded four times (25% growth four times): (1 + 1/4)^4 = 1.25^4 = 2.4414.",
                "Compounded ten times: (1 + 1/10)^10 = 2.5937. It rises, but the rate of increase is slowing down.",
                "Let's try compounding 1,000 times: (1 + 1/1000)^1000 = 2.7169. Compounding 10,000 times yields 2.7181.",
                "We realize the values are not zooming off to infinity! They are decelerating toward an absolute physical limit of approximately 2.71828...",
                "This number represents the absolute ceiling of continuous growth. We name it e."
              ],
              formalDefinition: "The base of natural growth (e) is the mathematical handrail limit of the sequence (1 + 1/n)^n as n approaches positive infinity: e = lim_{n -> inf} (1 + 1/n)^n ~ 2.718281828...",
              scaffolding: [
                {
                  type: "numerical_sequence",
                  title: "Compounding Limit Convergence",
                  content: "n=1: 2.00000 | n=2: 2.25000 | n=5: 2.48832 | n=10: 2.59374 | n=100: 2.70481 | n=1000: 2.71692 | n=10000: 2.71815. Showing clear asymptotic bounding near 2.71828."
                }
              ]
            }
          ]
        },
        phase2: {
          problems: [
            { id: 1, problemText: "Evaluate the function f(x) = 5 * 2^x at the values x = -3, x = 0, and x = 4.", logicalCore: "Evaluating negative, zero, and positive exponents on continuous maps." },
            { id: 2, problemText: "Solve for continuous variable x: 3^{2x - 1} = 243.", logicalCore: "Solving transcendental exponential equations with common bases." },
            { id: 3, problemText: "Express log_2(64) + log_3(1/27) - ln(e^5) as a single simplified integer.", logicalCore: "Manipulating and simplifying logarithmic expressions across distinct bases." },
            { id: 4, problemText: "Solve the logarithmic equation: log_5(x + 6) + log_5(x + 2) = 1. Validate for extraneous roots.", logicalCore: "Transcendental root solving with domain constraint verification." },
            { id: 5, problemText: "A decay sequence holds the relation y_n = 500 * e^{-0.1n}. Determine the fractional ratio y_{n+1} / y_n.", logicalCore: "Ratio consistency in discrete natural exponential decays." },
            { id: 6, problemText: "Evaluate the limit of the expression (1 + 2/n)^{3n} as n approaches positive infinity.", logicalCore: "Deduction of compounded limits from fundamental e form." },
            { id: 7, problemText: "Solve the simultaneous transcendental system: 2^x * 3^y = 108 and 2^y * 3^x = 72.", logicalCore: "Multi-variable exponential simultaneous equation solving." },
            { id: 8, problemText: "Find the inverse function f^-1(x) for the continuous function f(x) = e^{2x - 3} + 4.", logicalCore: "Transcendental function inversion and range mapping." },
            { id: 9, problemText: "If ln(a) = p and ln(b) = q, express log_a(b^3) purely in terms of p and q.", logicalCore: "Change of base logarithmic identities manipulations." },
            { id: 10, problemText: "Find the horizontal asymptote boundary of f(x) = (8 * e^x + 5) / (2 * e^x - 3) as x approaches negative infinity and positive infinity.", logicalCore: "Rational exponential asymptotic limits." }
          ]
        },
        phase3: {
          problems: [
            { id: 1, scenario: "A biological culture of bacteria replicates exponentially in a warm nutrient dish.", constraints: ["Growth pattern is continuous exponential.", "At hour 2, count is 320 cells.", "At hour 5, count is 2,560 cells."], problemText: "Determine the constant growth rate multiplier per hour, isolate the initial cell count at hour zero, and calculate the cell count at hour 10." },
            { id: 2, scenario: "A radioisotope element stored in a safety capsule decays continuously over years.", constraints: ["The decay matches natural continuous exponential form.", "Initial mass at year 0 is 80 grams.", "After 15 years, the remaining mass is 40 grams."], problemText: "Evaluate the continuous decay rate parameter lambda, and calculate the year mark when the mass drops to exactly 5 grams." },
            { id: 3, scenario: "A capital investment compounds continuously in a secure credit fund.", constraints: ["The balance grows via continuous compounding.", "Initial deposit is $5,000.", "The annual interest yield rate is 6 percent."], problemText: "Deduce the mathematical balance equation over years, and determine the exact number of years required for capital to triple in size." },
            { id: 4, scenario: "A deep-well submersible pressure pump cools in ambient water after power shutoff.", constraints: ["Cooling pattern conforms to Newton's law: temperature difference decays exponentially.", "Surrounding water is fixed at 12 degrees.", "Pump temperature at shutoff (minute 0) is 92 degrees.", "At minute 10, temperature is 52 degrees."], problemText: "Map the cooling equation, and estimate the temperature of the turbine at minute 30." },
            { id: 5, scenario: "An acoustic barrier attenuates sound energy exponentially as decibels penetrate depth layers.", constraints: ["Energy drop is exponential per millimeter of barrier thickness.", "At a depth of 4 millimeters, sound energy drops by 50 percent."], problemText: "Determine the transmission factor constant, and calculate the depth of barrier material needed to eliminate 99 percent of the sound wave force." },
            { id: 6, scenario: "A parachute pilot drops from a transport craft, accelerating under gravity until air drag balances weight.", constraints: ["Ascending velocity approaches terminal limit exponentially.", "The terminal velocity boundary is 55 meters per second.", "The velocity at second 3 is 25 meters per second."], problemText: "Construct the exponential velocity curve, and compute the speed generated at second 12." },
            { id: 7, scenario: "An electric current decays inside an induction coil system after the power relay opens.", constraints: ["Current curve matches exponential decay.", "At millisecond 4, current is 12 amperes.", "At millisecond 10, current is 1.5 amperes."], problemText: "Determine the initial inductive current at power trip (millisecond 0), and calculate the current at millisecond 20." },
            { id: 8, scenario: "A mining corporation extracts mineral reserves from a finite seam under a rate that decays relative to remaining tonnage.", constraints: ["Cumulative extraction follows bounded exponential asymptotic limit.", "The total accessible reserve ceiling is 100,000 tons.", "By year 3, a total of 40,000 tons has been recovered."], problemText: "Establish the recovery equation, and predict the year mark when 90 percent of the total resource has been fully depleted." },
            { id: 9, scenario: "A vacuum pump evacuates air from a sealed gas chamber during industrial purging cycles.", constraints: ["Chamber pressure drops exponentially.", "At cycle 2, pressure is 600 torr.", "At cycle 5, pressure is 75 torr."], problemText: "Deduce the starting atmospheric pressure before evacuation, and calculate the cycle mark when pressure drops below 1 torr." },
            { id: 10, scenario: "A corporate marketing campaign achieves target consumer awareness over weeks.", constraints: ["Success rate adheres to a logistic model with a growth limit ceiling.", "The absolute maximum market reach is 100 percent of audience.", "Initial awareness state at week 0 is 10 percent.", "At week 4, awareness hits 50 percent."], problemText: "Construct the logistic evolution curve, and determine the expected awareness status at week 8." },
            { id: 11, scenario: "A high-precision light sensor is lowered into a deep ocean trench, measurement counts fade exponentially with depth.", constraints: ["Light intensity drops exponentially.", "Every 15 meters of ocean water reduces light by 35 percent."], problemText: "Determine the decay rate per meter, and calculate the depth where the light intensity is exactly 1 percent of surface value." },
            { id: 12, scenario: "A heavy-duty flywheel stores rotational kinetic energy that bleeds away through friction during standby.", constraints: ["Friction losses decay the energy exponentially over standby hours.", "Initial stored state is 10.0 Megajoules.", "After 8 hours of standby, energy drops to 7.2 Megajoules."], problemText: "Construct the energy loss equation, and calculate the percentage of total energy lost after 24 full hours of inactive storage." },
            { id: 13, scenario: "A commercial brand introduces a new flavor, establishing customer adoption that expands self-referentially.", constraints: ["Initial sales follow pure exponential multiplication.", "Sales at month 1 are 1,200 units.", "Sales at month 3 are 4,800 units."], problemText: "Calculate the monthly multiplier, and predict sales for month 6 assuming the exponential ceiling has not been reached." },
            { id: 14, scenario: "A high-precision capacitor discharges electrical charge through a high-resistance path.", constraints: ["Voltage drops on natural exponent curve V(t) = V0 * e^{-t / tau}.", "Initial voltage is 24 Volts.", "At second 0.2, voltage is 18 Volts."], problemText: "Determine the time-constant parameter tau, and calculate the voltage at second 1.0." },
            { id: 15, scenario: "A biological compound decomposes continuously in an human bloodstream.", constraints: ["Half-life of the compound is 6 hours.", "Initial dose concentration is 80 milligrams."], problemText: "Construct the continuous exponential system describing dose remaining, and calculate the mass remainder after 24 hours." },
            { id: 16, scenario: "A thermal insulation brick resists heat leakage from a kiln.", constraints: ["The temperature gradient through the brick thickness decays exponentially.", "Inner wall surface is at 800 degrees.", "Outer brick surface (thickness 12 centimeters) is at 100 degrees."], problemText: "Find the thermal formula as a function of depth x, and calculate the temperature at a depth of 6 centimeters inside the brick." },
            { id: 17, scenario: "A chemical process converts an active reactant agent during constant agitation.", constraints: ["Reactant concentration decays exponentially.", "After 15 minutes, 30 percent of the original reactant compound has been converted."], problemText: "Calculate the exact decay parameter, and determine the minute index when exactly 90 percent has been converted." },
            { id: 18, scenario: "A water purification filter captures microplastics recursively.", constraints: ["Each layer of filter material removes exactly 40 percent of remaining microplastic particulates.", "An initial water sample contains 5,000 plastic units per liter."], problemText: "Express the plastic count in terms of the number of filter layers n, and determine the filter layer count required to drop the microplastics count below 10 units per liter." },
            { id: 19, scenario: "An economic commodity experiences compounding price inflation over months of resource shortage.", constraints: ["Price rises continuously.", "Initial cost is $15.00.", "After 6 months, the cost is $27.00."], problemText: "Find the monthly inflation exponent, and estimate the expected cost at month 12." },
            { id: 20, scenario: "A heavy crane hoist cable experiences compound friction as it wraps around a circular metal anchor drum.", constraints: ["The friction tension holds the relation T(theta) = T0 * e^{mu * theta}, where theta is wrap angle in radians.", "A wrap angle of 180 degrees (pi radians) raises holding force from 200 Newtons to 1,000 Newtons."], problemText: "Evaluate the friction coefficient constant mu, and calculate the tension force held when the cable makes three complete loops (6*pi radians) around the anchor drum." }
          ]
        }
      }
    ]
  }
];
