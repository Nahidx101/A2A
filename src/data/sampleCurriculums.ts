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
                "Suppose we measure temperature on Monday in Celsius and get $15^\\circ\\text{C}$. On Tuesday we get $22^\\circ\\text{C}$. We could list them as separate numbers, but listing individual details does not reveal how they connect. To capture change, we need to know what separate states share.",
                "Let's represent them on a simple line. State $A$ resides at $15$. State $B$ resides at $22$. We could count the space between them: $16, 17, 18, 19, 20, 21, 22$. That is exactly $7$ steps.",
                "Wait, what if the value drops? From $22$ down to $15$? The count is still $7$ steps, but the direction is complementary. If we arbitrarily subtract: $15 - 22$, we get $-7$. If we subtract: $22 - 15$, we get $7$.",
                "We realize that the fundamental distance—the absolute variation—is the basic subtraction of one marker from another. It represents the size of the gap. If we have states $s_1$ and $s_2$, the intervals are their differences: $$\\Delta s = s_2 - s_1$$",
                "Therefore, the interval measurement is the basic operator of comparison. It does not measure what the states are, but what space separates them."
              ],
              formalDefinition: "For any two distinct real values $x_1$ and $x_2$ describing states of a single quantity, the absolute interval (or difference) is the quantity $\\Delta x = x_2 - x_1$, representing the directed scalar distance required to transition from the initial state to the final state.",
              scaffolding: [
                {
                  type: "numerical_sequence",
                  title: "Interval Differences Sequence",
                  content: "State index $k = [0, 1, 2, 3]$ yields Values $[12, 19, 26, 33]$. Intervals between adjacent states are: $(19 - 12 = 7)$, $(26 - 19 = 7)$, $(33 - 26 = 7)$. The step interval $\\Delta y = 7$ remains strictly static."
                }
              ]
            },
            {
              id: "l1-ac2",
              conceptName: "Uniform Temporal Stepping",
              socraticQuestion: "How do we prove that a value is changing in a reliable, unhurried rhythm rather than erratic bursts?",
              honestReasoning: [
                "Assume a quantity is growing. We check it at noon: $5$. We check it at 3 PM: $11$. We check it at 4 PM: $13$. Is the rate steady?",
                "Wait, the time periods are unequal. From 12:00 to 15:00 is $3$ hours (increment is $6$). From 15:00 to 16:00 is $1$ hour (increment is $2$).",
                "If we check only the values ($5$ to $11$ is $+6$, $11$ to $13$ is $+2$), it looks variable. But if we break the time intervals down to equal slices of $1$ hour, we see: hour 1 ($+2$), hour 2 ($+2$), hour 3 ($+2$), hour 4 ($+2$).",
                "We realize we cannot talk about steady growth without establishing a baseline of uniform steps in our sampling variable. If we divide the independent variable into perfect, uniform intervals ($\\Delta x = c$), the dependent intervals ($\\Delta y$) must match each other uniformly.",
                "This guarantees that the change is locked to a steady scalar scale. The sequence must proceed predictably."
              ],
              formalDefinition: "Uniform stepping is the state where, for any equal divisions of the independent variable domain ($\\Delta x_1 = \\Delta x_2$), the resulting intervals of the dependent variable are strictly congruent: $\\Delta y_1 = \\Delta y_2$.",
              scaffolding: [
                {
                  type: "coordinate_table",
                  title: "Uniform Independent Sampling",
                  content: "| Independent Input ($x$) | Dependent Result ($y$) | Interval ($\\Delta y$) |\n|---|---|---|\n| $0$ | $5$ | - |\n| $1$ | $8$ | $+3$ |\n| $2$ | $11$ | $+3$ |\n| $3$ | $14$ | $+3$ |\n| $4$ | $17$ | $+3$ |"
                }
              ]
            },
            {
              id: "l1-ac3",
              conceptName: "The Ratio of Displacements (Slope)",
              socraticQuestion: "If we cannot guarantee that our measurements occur at perfect, equal steps, how do we find the unique signature of steady rate change?",
              honestReasoning: [
                "Suppose we measure random points: $(x_1=1, y_1=7)$ and $(x_2=4, y_2=16)$. The step in $x$ is $3$, the step in $y$ is $9$. Another pair: $(x_3=10, y_3=34)$. The step in $x$ from $4$ to $10$ is $6$, the step in $y$ from $16$ to $34$ is $18$.",
                "How do we equate '9 steps of $y$ for 3 steps of $x$' with '18 steps of $y$ for 6 steps of $x$'?",
                "We could divide: $9 / 3 = 3$. And $18 / 6 = 3$. Both yield exactly $3$ units of vertical motion for every $1$ unit of horizontal motion.",
                "Let us test a wrong path: what if we subtracted them instead? $(9 - 3 = 6)$ and $(18 - 6 = 12)$. The subtraction yields different values, so it does not capture the invariant characteristic of the change.",
                "Thus, the only comparison that remains constant across arbitrary measuring boundaries is the ratio of the change in the dependent variable to the change in the independent variable. We name this scale-invariant ratio the slope: $$m = \\frac{\\Delta y}{\\Delta x}$$"
              ],
              formalDefinition: "The slope $m$ of a linear system is the invariant ratio of the displacement of the dependent variable to the corresponding displacement of the independent variable over any non-zero interval: $$m = \\frac{y_2 - y_1}{x_2 - x_1} = \\frac{\\Delta y}{\\Delta x}$$",
              scaffolding: [
                {
                  type: "verbal_description",
                  title: "Mental Construction of a Constant Ratio Plane",
                  content: "Picture a straight path climbing a steady hill. If you walk forward any horizontal distance, say $10\\text{ meters}$, you rise exactly $4\\text{ meters}$. If you walk forward $5\\text{ meters}$ (half the distance), you rise exactly $2\\text{ meters}$ (half the rise). No matter how small or large your horizontal step, the quotient of your rise divided by your run is always exactly $0.4$. This straightness is defined by the absolute preservation of this ratio at every single point."
                }
              ]
            }
          ]
        },
        phase2: {
          problems: [
            { id: 1, problemText: "Given a discrete mapping where the independent variable $x$ changes by constant steps of $3$, and the output $y$ changes by constant steps of $-5$, calculate the exact change in $y$ when $x$ increases by $18$.", logicalCore: "Proportional scaling of first-order finite differences." },
            { id: 2, problemText: "Determine the constant value $r$ such that the set of ordered pairs $S = \\{(2, 9), (5, -3), (r, -15)\\}$ belong to the same first-order linear space.", logicalCore: "Collinearity of three coordinate pairs in $\\mathbb{R}^2$." },
            { id: 3, problemText: "A function $f$ satisfying $f(x + h) - f(x) = k \\cdot h$ for all real $x$ and $h$ has $f(2) = 11$ and $f(5) = 26$. Evaluate $k$ and express $f(0)$ as a clean integer.", logicalCore: "Abstract linear form from functional difference equation." },
            { id: 4, problemText: "Let a sequence of values hold the relation $x_{n+1} = x_n - 4.5$. If $x_4 = 17$, determine the value of $x_{100}$.", logicalCore: "Arithmetic progression behavior over large step counts." },
            { id: 5, problemText: "For a linear function containing points $(p, q)$ and $(u, v)$ where $p \\neq u$, prove that swapping the input coordinates to scale the slope yields $m_{\\text{new}} = -m_{\\text{old}}$.", logicalCore: "Symmetric properties of the fraction gradient structure." },
            { id: 6, problemText: "In the coordinate system where $y$ is defined as containing points $(c, 2c + 5)$, write the coordinate pairs for when the independent parameter step size represents twice the absolute value of the offset index.", logicalCore: "Algebraic mapping with parameterized variable steps." },
            { id: 7, problemText: "Find the intersection point $(x_i, y_i)$ of two linear systems: the first mapping contains the interval pairs $(0, 4)$ and $(2, 8)$, and the second contains $(1, 10)$ and $(4, 1)$.", logicalCore: "Simultaneous linear algebraic systems solution." },
            { id: 8, problemText: "An abstract sequence has first-order differences $d_n = y_{n+1} - y_n$. If $d_n = 7$ for all integers $n$, and $y_{12} = 80$, establish the precise formula for $y_n$ in terms of $n$.", logicalCore: "First-order discrete differential equation with boundary state." },
            { id: 9, problemText: "Let $f(x)$ be a linear function. Show that if $f(a)$, $f(b)$, $f(c)$ form an arithmetic progression, then $a$, $b$, and $c$ must also form an arithmetic progression given the slope is non-zero.", logicalCore: "Preservation of arithmetic sequences under linear mapping functions." },
            { id: 10, problemText: "Solve for variables $a$ and $b$ if the linear relation $ax + by = 24$ maps the coordinate differences such that $\\frac{\\Delta y}{\\Delta x} = -\\frac{3}{4}$, and the point $(4, 3)$ satisfies the constraint.", logicalCore: "Implicit linear form parameter determination from gradient and point." }
          ]
        },
        phase3: {
          problems: [
            { id: 1, scenario: "A fluid storage reservoir is emptied through a static discharge nozzle at a steady volumetric state.", constraints: ["Rate of discharge is strictly consistent.", "The initial volume at index hour $t = 2$ is $1400\\text{ m}^3$.", "The volume at index hour $t = 5$ is $800\\text{ m}^3$."], problemText: "Express the exact volume of remaining fluid $V(t)$ in terms of the hour index $t$, find the exact discharge rate, and calculate the time step when the reservoir reaches perfect vacuum ($V(t) = 0$)." },
            { id: 2, scenario: "A solid steel block expands lengthwise in direct proportion to the uniform thermal steps of a surrounding furnace.", constraints: ["The length increases linearly.", "At $100^\\circ\\text{C}$, length is $50.04\\text{ cm}$.", "At $300^\\circ\\text{C}$, length is $50.12\\text{ cm}$."], problemText: "Formulate the linear relation between temperature $T$ and steel length $L(T)$, and compute the hypothetical length when thermal action is reduced to absolute zero ($-273^\\circ\\text{C}$)." },
            { id: 3, scenario: "A high-altitude meteorological probe records ambient air pressure as it rises at a steady velocity.", constraints: ["Pressure drop is linear with altitude $h$.", "At $1500\\text{ meters}$ altitude, pressure is $840\\text{ mb}$", "At $4500\\text{ meters}$ altitude, pressure is $570\\text{ mb}$."], problemText: "Determine the uniform pressure decrease per meter of ascension, and state the exact pressure reading at sea level ($h = 0\\text{ m}$)." },
            { id: 4, scenario: "A manufacturer records total daily operating cost as a linear relation of the volume of mechanical output components produced.", constraints: ["The baseline fixed cost remains constant.", "Producing $200\\text{ components}$ requires $\\$4,500$.", "Producing $500\\text{ components}$ requires $\\$9,000$."], problemText: "Isolate the fixed daily capital required before any component is built, and state the marginal cost addition required to create a single mechanical component." },
            { id: 5, scenario: "A telecommunications cable routes signals over a distance where resistance rises linearly with cable span.", constraints: ["At $5\\text{ km}$, resistance is $24\\ \\Omega$.", "At $12\\text{ km}$, resistance is $52\\ \\Omega$."], problemText: "Determine the resistance of a $40\\text{-kilometer}$ line, and derive the baseline resistance representing contact points at $0\\text{ km}$." },
            { id: 6, scenario: "Two chemical solutions are combined in a sealed reactor, producing a gas byproduct at a steady hourly volume rate.", constraints: ["Gas collection is cumulative.", "At hour $1.5$, the container holds $45\\text{ liters}$ of gas.", "At hour $4.0$, the container holds $110\\text{ liters}$ of gas."], problemText: "Deduce the initial mass of gas existing prior to reactor triggering, and determine the exact hour mark when the collection volume will hit $200\\text{ liters}$." },
            { id: 7, scenario: "An automated loader deposits loose aggregate into a shipping hopper at a constant rate.", constraints: ["The receiving scale records empty scale state before loading.", "At $12\\text{ minutes}$, total weight is $18\\text{ tons}$.", "At $20\\text{ minutes}$, total weight is $28\\text{ tons}$."], problemText: "Establish the loading speed in tons per minute, and check if the initial empty hopper had any residual material weight." },
            { id: 8, scenario: "A deep thermal spring pumps pressurized hot water to the surface where temperature drops as depth decreases.", constraints: ["Temperature changes linearly with depth $d$.", "At $800\\text{ meters}$ depth, temperature is $64^\\circ\\text{C}$.", "At $150\\text{ meters}$ depth, temperature is $25^\\circ\\text{C}$."], problemText: "Calculate the temperature rate of change per $100\\text{ meters}$ of depth, and map the projected thermal state at surface point ($d = 0\\text{ m}$)." },
            { id: 9, scenario: "An elevator is lowered into a subterranean mine shaft at a constant vertical speed.", constraints: ["Lowering occurs strictly linearly.", "At $20\\text{ seconds}$, depth is $-60\\text{ meters}$.", "At $55\\text{ seconds}$, depth is $-165\\text{ meters}$."], problemText: "Express depth $y(t)$ as a function of elapsed seconds $t$, and find the location index of the elevator cabin at second $t = 0$." },
            { id: 10, scenario: "A carbon emission filter gradually loses particulate accumulation capacity as gas flows through.", constraints: ["The drop in filter capacity is strictly linear to cumulative gas cubic units processed.", "Initial filter capacity is $98\\%$.", "After $12,000\\text{ m}^3$ of gas, filter capacity drops to $74\\%$."], problemText: "Find the rate of capacity degradation per $1,000\\text{ m}^3$ of gas, and find the total gas volume capacity limit when filtering efficacy drops to exactly $50\\%$." }
          ]
        }
      },
      {
        levelNumber: 2,
        levelName: "Quadratic Fields and Accelerated Rates",
        axiomaticBridge: {
          previousLevelConclusion: "Level 1 concluded that changing systems can be fully described, bounded, and predicted using a first-order constant difference ratio (slope) where equal steps of input result in identical, unchanging steps of output.",
          limitationOrEdgeCase: "However, this linear model completely collapses when we observe accelerating systems—such as a falling stone, a spreading biological colony, or a decelerating vehicle. In these physical realities, checking the intervals between adjacent equal-time steps reveals that the steps of the output are themselves changing in size. If $y$ is no longer steady, the first-order interval difference ($\\Delta y$) is not constant. Slope is no longer a single number, and Level 1 offers no math to describe what happens when the rate itself possesses a rate.",
          logicalInevitabilityOfNewConcept: "The only logical response is to analyze the difference of the differences. If the first-order difference ($\\Delta y$) varies, we must take the interval of those variations ($\\Delta(\\Delta y)$) to see if this second-order difference possesses a deeper, constant baseline. This leads us directly to the quadratic field, where the rate of change changes linearly, and the acceleration is the ultimate invariant constant."
        },
        phase1: {
          atomicConcepts: [
            {
              id: "l2-ac1",
              conceptName: "The Second-Order Difference (Acceleration)",
              socraticQuestion: "If our initial measurements show that our value changes by a different amount on every step, how do we find order in this apparent chaos?",
              honestReasoning: [
                "Assume we track an object's position over equal $1\\text{-second}$ ticks. Second 0: $0$. Second 1: $3$. Second 2: $8$. Second 3: $15$. Second 4: $24$.",
                "Let's look at the first-order differences ($\\Delta y$): from $0$ to $3$ is $+3$. From $3$ to $8$ is $+5$. From $8$ to $15$ is $+7$. From $15$ to $24$ is $+9$.",
                "The first-order difference is changing: it is $3, 5, 7, 9$. The system does not have a slope in the Level 1 sense. It is accelerating. But how do we define this acceleration?",
                "Let's treat the differences themselves as a new sequence: $D = \\{3, 5, 7, 9\\}$. What is the difference of this new sequence? That is the 'second difference' ($\\Delta^2 y$).",
                "Subtraction yields: $5 - 3 = +2$; $7 - 5 = +2$; $9 - 7 = +2$. The change of the change is perfectly constant!",
                "Thus, we discover that even when first-order rates of change are unstable, their instability can be completely regularized by a constant second-order difference. We define this state of constant double-differences as a quadratic system: $$\\Delta^2 y = \\text{constant}$$"
              ],
              formalDefinition: "The second-order difference $\\Delta^2 y$ of a sequence $y_n$ sampled at uniform intervals of $x$ is defined as the difference of consecutive first-order differences: $$\\Delta^2 y_n = \\Delta(\\Delta y_n) = (y_{n+2} - y_{n+1}) - (y_{n+1} - y_n) = y_{n+2} - 2y_{n+1} + y_n$$",
              scaffolding: [
                {
                  type: "coordinate_table",
                  title: "Second-order Difference Mapping",
                  content: "| Index $x$ | Output $y$ | First Diff ($\\Delta y$) | Second Diff ($\\Delta^2 y$) |\n|---|---|---|---|\n| $0$ | $1$ | - | - |\n| $1$ | $4$ | $+3$ | - |\n| $2$ | $9$ | $+5$ | $+2$ |\n| $3$ | $16$ | $+7$ | $+2$ |\n| $4$ | $25$ | $+9$ | $+2$ |"
                }
              ]
            },
            {
              id: "l2-ac2",
              conceptName: "Symmetrical Reversal (The Vertex)",
              socraticQuestion: "If a system is steadily losing its forward rate of change, what happens at the exact boundary when the rate crosses zero and becomes negative?",
              honestReasoning: [
                "Suppose a value increases but decelerates. First difference is $+3$, then $+1$, then what?",
                "If the second-order difference is a constant $-2$, the sequence of differences must be: $+3, +1, -1, -3$.",
                "Let's build the values starting from $0$: Start at $0$. Add $3 \\to 3$. Add $1 \\to 4$. Add $-1 \\to 3$. Add $-3 \\to 0$.",
                "The values go: $0, 3, 4, 3, 0$. The maximum state is reached at $4$ when the rate changes sign. Around this peak, the values are perfectly mirrored: $3$ is on both sides, $0$ is on both sides.",
                "Why is it symmetrical? Because the rate loses speed exactly as fast as it gains downward speed, dictated by the constant second-order operator. Symmetrical reversal is a logical necessity of constant second differences."
              ],
              formalDefinition: "The vertex of a quadratic function is the unique point where the first-order difference $\\Delta y$ transitions through zero, marking the axis of absolute reflective symmetry: $f(x_v - d) = f(x_v + d)$ for any distance $d$.",
              scaffolding: [
                {
                  type: "numerical_sequence",
                  title: "Symmetric Deceleration Values",
                  content: "Input sequence $x = [-2, -1, 0, 1, 2, 3, 4]$. Output sequence $y = [5, 8, 9, 8, 5, 0, -7]$. The vertex resides at coordinates $(0, 9)$, showing perfect reflection values surrounding it ($8, 5$ on both sides)."
                }
              ]
            }
          ]
        },
        phase2: {
          problems: [
            { id: 1, problemText: "Evaluate the unique quadratic function $f(x) = ax^2 + bx + c$ satisfying $f(0) = 4$, $f(1) = 7$, and $f(2) = 14$.", logicalCore: "Solving for quadratic coefficients using systematic point mapping." },
            { id: 2, problemText: "For $f(x) = 3x^2 - 12x + 19$, prove algebraically that $f(2 - d) = f(2 + d)$ for any real offset value $d$.", logicalCore: "Algebraic validation of the parabolic axis of symmetry." },
            { id: 3, problemText: "A discrete function $y_n$ has constant second differences $\\Delta^2 y = 6$. If $y_0 = 5$ and $y_1 = 8$, calculate the value of $y_5$.", logicalCore: "Reconstructing quadratic sequences from second differences." },
            { id: 4, problemText: "Find the coordinates of the turning point (vertex) of the abstract system $y = -2x^2 + 16x - 24$, and state whether it represents a boundary ceiling (maximum) or local basement floor (minimum).", logicalCore: "Extreme value and vertex coordinate identification." },
            { id: 5, problemText: "Solve the quadratic system $4x^2 - 20x + 25 = 0$ purely by factoring it into a square of a single binomial. State the algebraic meaning of the singular root.", logicalCore: "Analysis of double roots and zero-discriminant geometry." },
            { id: 6, problemText: "Find the values of $k$ for which the quadratic mapping $y = x^2 - kx + 16$ touches the horizontal axis ($y = 0$) at exactly one point.", logicalCore: "Discriminant boundary conditions for real roots." },
            { id: 7, problemText: "Determine the intersection coordinates of the linear system $y = 2x + 3$ and the quadratic curve $y = x^2 - x - 7$.", logicalCore: "Simultaneous linear-quadratic coordinate systems solutions." },
            { id: 8, problemText: "If the roots of $rx^2 + sx + t = 0$ are $r_1$ and $r_2$, prove from the coefficients that their sum $r_1 + r_2$ is strictly $-\\frac{s}{r}$ and their product $r_1 \\cdot r_2$ is $\\frac{t}{r}$.", logicalCore: "Vieta's formulas derivation from quadratic binomial multiplication." },
            { id: 9, problemText: "A sequence of first-differences $d_n = y_{n+1} - y_n$ is described by $d_n = 4n + 3$. Solve for the constant second difference $\\Delta^2 y_n$.", logicalCore: "Evaluating second order differences of linear difference maps." },
            { id: 10, problemText: "Prove that for any quadratic mapping $f(x) = ax^2 + bx + c$, the difference quotient $\\frac{f(x + h) - f(x)}{h}$ is a linear function of $x$ for any constant $h \\neq 0$.", logicalCore: "First-order difference quotient linearization of quadratics." }
          ]
        },
        phase3: {
          problems: [
            { id: 1, scenario: "A heavy steel sphere is dropped into a dense deceleration gas chamber.", constraints: ["The position drops downward with constant acceleration.", "At second $t = 1$, depth is $-5\\text{ meters}$.", "At second $t = 3$, depth is $-45\\text{ meters}$."], problemText: "Deduce the acceleration constant, construct the exact quadratic formula describing position over time $y(t)$, and determine the exact second mark when depth reaches $-125\\text{ meters}$." },
            { id: 2, scenario: "An agricultural compound optimizes crop volume yield based strictly on the density level of planting units.", constraints: ["The crop yield output follows quadratic decay due to crowding.", "Planting $10\\text{ units}$ yields $500\\text{ kg}$.", "Planting $20\\text{ units}$ yields $800\\text{ kg}$.", "Planting $40\\text{ units}$ yields $800\\text{ kg}$."], problemText: "Find the quadratic yield formula $Y(u)$, evaluate the density setting that achieves the absolute maximum yield potential, and identify the crowding point where yield drops to exactly zero." },
            { id: 3, scenario: "A high-precision optical mirror is ground so that its slope decreases linearly from the outer rim to the absolute center.", constraints: ["The horizontal cross section shape is parabolic.", "The center point sits at $(0, 0)$.", "At horizontal distance $x = 10\\text{ cm}$, depth is exactly $5\\text{ mm}$."], problemText: "Construct the quadratic depth equation $y = a x^2$, and calculate the mirror depth at horizontal distance $x = 18\\text{ cm}$." },
            { id: 4, scenario: "A transit rail system decelerates a rapid cargo car to a perfect loading halt.", constraints: ["The position during braking is a quadratic decay curve.", "The car stops completely in exactly $12\\text{ seconds}$.", "The total braking distance traversed during those $12\\text{ seconds}$ is $144\\text{ meters}$."], problemText: "Calculate the initial deceleration value, and find the distance remaining after the first $6\\text{ seconds}$ of braking." },
            { id: 5, scenario: "A commercial power turbine generates electrical torque output relative to the variable spin frequency of its core.", constraints: ["The power output maps as a quadratic return curve.", "At $0\\text{ RPM}$, power is $0\\text{ kW}$.", "At $200\\text{ RPM}$, a power peak is reached at $400\\text{ kW}$.", "At $400\\text{ RPM}$, power drops back to $0\\text{ kW}$ due to safety governors."], problemText: "Derive the quadratic power function $P(f)$ of RPM frequency $f$, and determine the exact spin frequency that yields exactly $300\\text{kW}$." },
            { id: 6, scenario: "A specialized arch supports a concrete bridge deck above a deep ravine.", constraints: ["The arch curve is quadratic.", "The arch spans $100\\text{ meters}$ horizontally.", "The maximum height of the arch is $50\\text{ meters}$ at the centerline span."], problemText: "Establish coordinate boundaries and formulate the height equation, then calculate the structural height support required at a distance of $15\\text{ meters}$ from either outer horizontal bank." },
            { id: 7, scenario: "A high-voltage power transmission cable hangs suspended between two vertical grid towers.", constraints: ["The cable sag curve is treated as parabolic.", "The towers are spaced $200\\text{ meters}$ apart.", "The cable height at the towers is $35\\text{ meters}$.", "The cable height at the absolute center is $15\\text{ meters}$."], problemText: "Construct the quadratic vertical deflection curve equation, and find the clear height above ground at horizontal distance $40\\text{ meters}$ from the left tower." },
            { id: 8, scenario: "A thermal core element radiates heat energy such that temperature dissipation rates accelerate closer to the outer surface boundaries.", constraints: ["The interior thermal profile is a quadratic function of radius $r$.", "At core $r = 0\\text{ cm}$, temperature is $1200^\\circ\\text{C}$.", "At surface boundary $r = 10\\text{ cm}$, temperature is $200^\\circ\\text{C}$."], problemText: "Formulate the thermal distribution equation $T(r)$, and calculate the temperature at a depth index of $r = 5\\text{ cm}$." },
            { id: 9, scenario: "A liquid vortex is formed inside a rotating centrifuge cylinder, curving the fluid surface high against the cylinder walls.", constraints: ["The profile of the spinning fluid boundary is quadratic.", "The lowest point of the fluid curve is at center axis coordinate $x=0$ with height $10\\text{ cm}$.", "At a radial distance of $x=6\\text{ cm}$, the fluid rises to $28\\text{ cm}$."], problemText: "Define the quadratic rising shape $y(x)$, and evaluate the fluid surface altitude index at radial distance $x=10\\text{ cm}$." },
            { id: 10, scenario: "An automation drone adjusts thrust as it descends from a skyscraper pad.", constraints: ["Thrust output relative to remaining height forms a quadratic mapping.", "At altitude $100\\text{ meters}$, thrust is $40\\text{ units}$.", "At altitude $50\\text{ meters}$, thrust is $15\\text{ units}$.", "At altitude $10\\text{ meters}$, thrust is $7\\text{ units}$."], problemText: "Determine the quadratic coefficients of drone thrust, and find the minimum possible thrust projected by this mapping before ground impact." },
            { id: 11, scenario: "A chemical synthesizer experiences temperature variations during catalyst introduction.", constraints: ["The thermal history peaks quadratically over elapsed minutes $t$.", "Initial temperature at $t=0$ is $20^\\circ\\text{C}$.", "A peak temperature of $84^\\circ\\text{C}$ occurs at $t = 8\\text{ minutes}$."], problemText: "Establish the complete thermodynamic formula over time $T(t)$, and determine the minute markers $t$ when temperature is exactly $52^\\circ\\text{C}$." },
            { id: 12, scenario: "An elastic cord is stretched, storing mechanical potential energy in non-linear proportion to the stretch distance.", constraints: ["Energy accumulation is quadratic.", "Stretching $2\\text{ cm}$ stores $0.16\\text{ Joules}$.", "Stretching $5\\text{ cm}$ stores $1.00\\text{ Joules}$."], problemText: "Verify the proportional constant in $E(x) = k x^2$, and determine the stretch length $x$ required to store exactly $4.00\\text{ Joules}$." },
            { id: 13, scenario: "A deep irrigation pipe discharges water such that the cross-sectional velocity profile of the internal stream decelerates near the pipe's rough walls.", constraints: ["Velocity profile is parabolic across the pipe diameter.", "Peak velocity of $4.5\\text{ m/s}$ occurs at the center axis ($r = 0$).", "Velocity is exactly $0$ at the pipe wall boundary ($r = 15\\text{ mm}$)."], problemText: "Formulate the velocity function $V(r)$, and evaluate velocity at $r = 10\\text{ mm}$ from the center." },
            { id: 14, scenario: "A manufacturing array experiences tooling wear that increases over operational cycles.", constraints: ["Tool wear rate accelerates over cumulative cycles $N$.", "Wear at $N = 1,000$ is $0.05\\%$.", "Wear at $N = 3,000$ is $0.45\\%$.", "Wear at $N = 5,000$ is $1.25\\%$."], problemText: "Formulate the quadratic wear function $W(N)$, and predict the precise operational cycle when tool failure occurs (defined as wear hitting $2.00\\%$)." },
            { id: 15, scenario: "A solar reactor dome gathers ambient illumination on its reflective curved shell.", constraints: ["The reflective cross section curve is parabolic.", "The focus of the collection rays must target a receiver situated on the vertical axis of symmetry.", "The dome profile matches the equation $y = 0.05x^2$."], problemText: "Calculate the exact vertical height coordinate of the focus point relative to absolute dome bottom using the parabolic focus formula $4py = x^2$." }
          ]
        }
      },
      {
        levelNumber: 3,
        levelName: "Exponential Scaling and Continuity Limits",
        axiomaticBridge: {
          previousLevelConclusion: "Level 2 established the quadratic field, illustrating that accelerating systems can be predicted by holding the second difference constant ($\\Delta^2 y = c$). This solved systems where rate change is dictated by an outside, constant physical force.",
          limitationOrEdgeCase: "However, the quadratic model fails when we examine biological reproduction, chemical cascade explosions, or capital compounding. In these systems, the size of the growth does not depend on an external constant force—it depends directly on the current volume of the growing element itself. More bacteria create more offspring; larger capital balances generate greater interest payments. This is not constant acceleration (Level 2) or constant stepping (Level 1); the rate of change is proportional to the state itself. Polynomial growth curves are completely left behind by this self-referential expansion.",
          logicalInevitabilityOfNewConcept: "To solve self-referential processes, we must introduce a system where the ratio of adjacent values is constant ($\\frac{y_{n+1}}{y_n} = r$). This shifts us from arithmetic increments to geometric multipliers, laying the foundation for exponential scaling where growth continuously feeds back into itself. This creates a landscape defined by proportional compounding and asymptotic limits."
        },
        phase1: {
          atomicConcepts: [
            {
              id: "l3-ac1",
              conceptName: "Proportional Growth (The Multiplier)",
              socraticQuestion: "If a quantity grows faster the bigger it becomes, how do we write a mathematical rule that remains constant throughout this explosion?",
              honestReasoning: [
                "Suppose a cell divides in two every hour. Hour 0: $1$. Hour 1: $2$. Hour 2: $4$. Hour 3: $8$. Hour 4: $16$.",
                "Let's look at the first differences ($\\Delta y$): $1, 2, 4, 8$. They do not stay constant (Level 1 has failed).",
                "Let's look at the second differences ($\\Delta^2 y$): $1, 2, 4$. They do not stay constant either (Level 2 has failed!). We could take third, fourth, or hundredth differences, and they would still escalate.",
                "We must look for a different constant. Let's divide adjacent values instead of subtracting them: $2/1 = 2$; $4/2 = 2$; $8/4 = 2$; $16/8 = 2$.",
                "The quotient is perfectly constant! This is a geometric multiplier. Every level depends on the previous level multiplied by this base: $$y_{n+1} = r \\cdot y_n$$",
                "This multiplier is the invariant signature of self-referential systems."
              ],
              formalDefinition: "An exponential system is a mapping where the ratio of the dependent variable at sequential, equal steps of the independent variable remains strictly constant: $$\\frac{y_{x+h}}{y_x} = b^h$$ where $b$ is the constant growth base.",
              scaffolding: [
                {
                  type: "coordinate_table",
                  title: "Exponential Ratio Table",
                  content: "| Input $x$ | Output $y$ | Ratio ($y_x / y_{x-1}$) |\n|---|---|---|\n| $0$ | $3$ | - |\n| $1$ | $9$ | $3.0$ |\n| $2$ | $27$ | $3.0$ |\n| $3$ | $81$ | $3.0$ |\n| $4$ | $243$ | $3.0$ |"
                }
              ]
            },
            {
              id: "l3-ac2",
              conceptName: "The Continuous Limit (e)",
              socraticQuestion: "If we compound a growth rate more and more frequently—not just every year, but every hour, second, or instant—does the value blow up to infinity, or does it hit an invisible ceiling?",
              honestReasoning: [
                "Suppose we have $100\\%$ growth rate over $1$ unit of time. If we compound once, we get: $(1 + 1)^1 = 2.0$.",
                "What if we compound twice ($50\\%$ growth twice)? We get: $(1 + \\frac{1}{2})^2 = 1.5^2 = 2.25$. It is larger.",
                "Compounded four times ($25\\%$ growth four times): $(1 + \\frac{1}{4})^4 = 1.25^4 \\approx 2.4414$.",
                "Compounded ten times: $(1 + \\frac{1}{10})^{10} \\approx 2.5937$. It rises, but the rate of increase is slowing down.",
                "Let's try compounding $1,000$ times: $(1 + \\frac{1}{1000})^{1000} \\approx 2.7169$. Compounding $10,000$ times yields $2.7181$.",
                "We realize the values are not zooming off to infinity! They are decelerating toward an absolute physical limit of approximately $2.71828\\dots$",
                "This number represents the absolute ceiling of continuous growth. We name this constant limit $e$: $$\\lim_{n_e \\to \\infty} \\left(1 + \\frac{1}{n_e}\\right)^{n_e} = e$$"
              ],
              formalDefinition: "The base of natural growth $e$ is the mathematical limit of the compounding process as the compounding frequency approaches infinity: $$e = \\lim_{n \\to \\infty} \\left(1 + \\frac{1}{n}\\right)^n \\approx 2.718281828$$",
              scaffolding: [
                {
                  type: "numerical_sequence",
                  title: "Compounding Limit Convergence",
                  content: "$n=1 \\to 2.000s$ \\| $n=2 \\to 2.2500$ \\| $n=5 \\to 2.4883$ \\| $n=10 \\to 2.5937$ \\| $n=100 \\to 2.7048$ \\| $n=1000 \\to 2.7169$ \\| $n=10000 \\to 2.7181$. Showing clear asymptotic bounding near $e \\approx 2.71828$."
                }
              ]
            }
          ]
        },
        phase2: {
          problems: [
            { id: 1, problemText: "Evaluate the function $f(x) = 5 \\cdot 2^x$ at the values $x = -3$, $x = 0$, and $x = 4$.", logicalCore: "Evaluating negative, zero, and positive exponents on continuous maps." },
            { id: 2, problemText: "Solve for continuous variable $x$: $3^{2x - 1} = 243$.", logicalCore: "Solving transcendental exponential equations with common bases." },
            { id: 3, problemText: "Express $\\log_2(64) + \\log_3(\\frac{1}{27}) - \\ln(e^5)$ as a single simplified integer.", logicalCore: "Manipulating and simplifying logarithmic expressions across distinct bases." },
            { id: 4, problemText: "Solve the logarithmic equation: $\\log_5(x + 6) + \\log_5(x + 2) = 1$. Validate for extraneous roots.", logicalCore: "Transcendental root solving with domain constraint verification." },
            { id: 5, problemText: "A decay sequence holds the relation $y_n = 500 \\cdot e^{-0.1n}$. Determine the fractional ratio $\\frac{y_{n+1}}{y_n}$.", logicalCore: "Ratio consistency in discrete natural exponential decays." },
            { id: 6, problemText: "Evaluate the limit of the expression $\\left(1 + \\frac{2}{n}\\right)^{3n}$ as $n$ approaches positive infinity.", logicalCore: "Deduction of compounded limits from fundamental $e$ form." },
            { id: 7, problemText: "Solve the simultaneous transcendental system: $2^x \\cdot 3^y = 108$ and $2^y \\cdot 3^x = 72$.", logicalCore: "Multi-variable exponential simultaneous equation solving." },
            { id: 8, problemText: "Find the inverse function $f^{-1}(x)$ for the continuous function $f(x) = e^{2x - 3} + 4$.", logicalCore: "Transcendental function inversion and range mapping." },
            { id: 9, problemText: "If $\\ln(a) = p$ and $\\ln(b) = q$, express $\\log_a(b^3)$ purely in terms of $p$ and $q$.", logicalCore: "Change of base logarithmic identities manipulations." },
            { id: 10, problemText: "Find the horizontal asymptote boundary of $f(x) = \\frac{8 e^x + 5}{2 e^x - 3}$ as $x \\to -\\infty$ and $x \\to +\\infty$.", logicalCore: "Rational exponential asymptotic limits." }
          ]
        },
        phase3: {
          problems: [
            { id: 1, scenario: "A biological culture of bacteria replicates exponentially in a warm nutrient dish.", constraints: ["Growth pattern is continuous exponential: $N(t) = N_0 e^{rt}$.", "At hour $t=2$, count is $320\\text{ cells}$.", "At hour $t=5$, count is $2,560\\text{ cells}$."], problemText: "Determine the constant growth rate parameter $r$, isolate the initial cell count $N_0$ at hour zero, and calculate the cell count at hour $t=10$." },
            { id: 2, scenario: "A radioisotope element stored in a safety capsule decays continuously over years.", constraints: ["The decay matches natural continuous exponential form $M(t) = M_0 e^{-\\lambda t}$.", "Initial mass at year $0$ is $80\\text{ grams}$.", "After $15\\text{ years}$, the remaining mass is $40\\text{ grams}$."], problemText: "Evaluate the continuous decay rate parameter $\\lambda$, and calculate the exact year mark when the active mass drops to exactly $5\\text{ grams}$." },
            { id: 3, scenario: "A capital investment compounds continuously in a secure credit fund.", constraints: ["The balance grows via continuous compounding: $A(t) = P e^{rt}$.", "Initial deposit $P = \\$5,000$.", "The annual interest yield rate is $6\\%$ ($r = 0.06$)."], problemText: "Deduce the mathematical balance equation over years $t$, and determine the exact number of years required for the capital to triple in size." },
            { id: 4, scenario: "A deep-well submersible pressure pump cools in ambient water after power shutoff.", constraints: ["Cooling pattern conforms to Newton's law: temp difference decays exponentially.", "Surrounding water is fixed at $12^\\circ\\text{C}$.", "Pump temperature at shutoff (minute $t=0$) is $92^\\circ\\text{C}$.", "At minute $t=10$, temperature is $52^\\circ\\text{C}$."], problemText: "Map the cooling equation $T(t)$, and estimate the temperature of the turbine at minute $t=30$." },
            { id: 5, scenario: "An acoustic barrier attenuates sound energy exponentially as decibels penetrate depth layers.", constraints: ["Energy drop is exponential per millimeter of barrier thickness: $E(x) = E_0 e^{-\\kappa x}$.", "At a depth of $4\\text{ mm}$, sound energy drops by exactly $50\\%$."], problemText: "Determine the transmission factor constant $\\kappa$, and calculate the depth of barrier material needed to eliminate $99\\%$ of the sound wave force." },
            { id: 6, scenario: "A parachute pilot drops from a transport craft, accelerating under gravity until air drag balances weight.", constraints: ["Ascending velocity approaches terminal limit exponentially: $v(t) = v_T(1 - e^{-kt})$.", "The terminal velocity boundary $v_T = 55\\text{ m/s}$.", "The velocity at second $t = 3$ is $25\\text{ m/s}$."], problemText: "Construct the exponential velocity curve, and compute the speed generated at second $t = 12$." },
            { id: 7, scenario: "An electric current decays inside an induction coil system after the power relay opens.", constraints: ["Current curve matches exponential decay $I(t) = I_0 e^{-t/\\tau}$.", "At millisecond $t = 4$, current is $12\\text{ amperes}$.", "At millisecond $t = 10$, current is $1.5\\text{ amperes}$."], problemText: "Determine the starting current $I_0$ at power trip (millisecond $0$), and calculate the current at millisecond $t = 20$." },
            { id: 8, scenario: "A mining corporation extracts mineral reserves from a finite seam under a rate that decays relative to remaining tonnage.", constraints: ["Cumulative extraction follows bounded exponential asymptotic limit.", "The total accessible reserve ceiling is $100,000\\text{ tons}$.", "By year $3$, a total of $40,000\\text{ tons}$ has been recovered."], problemText: "Establish the recovery equation, and predict the year mark when $90\\%$ of the total resource has been fully depleted." },
            { id: 9, scenario: "A vacuum pump evacuates air from a sealed gas chamber during industrial purging cycles.", constraints: ["Chamber pressure drops exponentially: $P(n) = P_0 a^n$.", "At cycle $2$, pressure is $600\\text{ torr}$.", "At cycle $5$, pressure is $75\\text{ torr}$."], problemText: "Deduce the starting atmospheric pressure $P_0$ before evacuation, and calculate the cycle mark $n$ when pressure drops below $1\\text{ torr}$." },
            { id: 10, scenario: "A corporate marketing campaign achieves target consumer awareness over weeks.", constraints: ["Success rate adheres to a logistic model with a growth limit ceiling.", "The absolute maximum market reach is $100\\%$ of the audience.", "Initial awareness state at week $t=0$ is $10\\%$.", "At week $t=4$, awareness hits $50\\%$."], problemText: "Construct the logistic evolution curve, and determine the expected awareness status at week $t=8$." },
            { id: 11, scenario: "A high-precision light sensor is lowered into a deep ocean trench, measurement counts fade exponentially with depth.", constraints: ["Light intensity drops exponentially: $I(d) = I_0 e^{-kd}$.", "Every $15\\text{ meters}$ of ocean water depth reduces light by $35\\%$."], problemText: "Determine the decay rate per meter $k$, and calculate the depth $d$ where the light intensity is exactly $1\\%$ of surface value." },
            { id: 12, scenario: "A heavy-duty flywheel stores rotational kinetic energy that bleeds away through friction during standby.", constraints: ["Friction losses decay the energy exponentially over standby hours: $E(t) = E_0 e^{-\\alpha t}$.", "Initial stored state $E_0 = 10.0\\text{ MJ}$.", "After $8\\text{ hours}$ of standby, energy drops to $7.2\\text{ MJ}$."], problemText: "Construct the energy loss equation, and calculate the percentage of total energy lost after $24\\text{ full hours}$ of inactive storage." },
            { id: 13, scenario: "A commercial brand introduces a new flavor, establishing customer adoption that expands self-referentially.", constraints: ["Initial sales follow pure exponential multiplication: $S(t) = S_0 b^t$.", "Sales at month $t = 1$ are $1,200\\text{ units}$.", "Sales at month $t = 3$ are $4,800\\text{ units}$."], problemText: "Calculate the monthly multiplier $b$, and predict sales for month $t = 6$ assuming the exponential ceiling has not been reached." },
            { id: 14, scenario: "A high-precision capacitor discharges electrical charge through a high-resistance path.", constraints: ["Voltage drops on natural exponent curve: $V(t) = V_0 e^{-t / \\tau}$.", "Initial voltage $V_0 = 24\\text{ Volts}$.", "At second $t = 0.2$, voltage is $18\\text{ Volts}$."], problemText: "Determine the time-constant parameter $\\tau$, and calculate the voltage at second $t = 1.0$." },
            { id: 15, scenario: "A biological compound decomposes continuously in the human bloodstream.", constraints: ["Half-life of the active chemical compound is $6\\text{ hours}$.", "Initial dose concentration is $80\\text{ mg}$."], problemText: "Construct the continuous exponential system describing dose remaining, and calculate the chemical mass remainder after $24\\text{ hours}$." },
            { id: 16, scenario: "A thermal insulation brick resists heat leakage from a high-temperature kiln.", constraints: ["The temperature gradient through the brick thickness decays exponentially.", "Inner wall surface is at $800^\\circ\\text{C}$.", "Outer brick surface (thickness $12\\text{ cm}$) is at $100^\\circ\\text{C}$."], problemText: "Find the thermal formula as a function of depth $x$, and calculate the temperature at a depth of $6\\text{ cm}$ inside the brick." },
            { id: 17, scenario: "A chemical process converts an active reactant agent during constant agitation.", constraints: ["Reactant concentration decays exponentially.", "After $15\\text{ minutes}$, $30\\%$ of the original reactant compound has been converted."], problemText: "Calculate the exact decay parameter, and determine the minute index $t$ when exactly $90\\%$ has been converted." },
            { id: 18, scenario: "A water purification filter captures microplastics recursively.", constraints: ["Each layer of filter material removes exactly $40\\%$ of remaining microplastic particulates.", "An initial water sample contains $5,000\\text{ plastic units per liter}$."], problemText: "Express the microplastic count $P(n)$ in terms of the number of filter layers $n$, and determine the filter layer count required to drop the count below $10\\text{ units per liter}$." },
            { id: 19, scenario: "An economic commodity experiences compounding price inflation over months of resource shortage.", constraints: ["Price rises continuously: $P(t) = P_0 e^{rt}$.", "Initial cost $P_0 = \\$15.00$.", "After $6\\text{ months}$, the cost is $\\s27.00$."], problemText: "Find the monthly inflation exponent $r$, and estimate the expected cost at month $t = 12$." },
            { id: 20, scenario: "A heavy crane hoist cable experiences compound friction as it wraps around a circular metal anchor drum.", constraints: ["The friction tension holds the relation: $T(\\theta) = T_0 e^{\\mu \\theta}$, where $\\theta$ is wrap angle in radians.", "A wrap angle of $180^\\circ$ ($\\pi\\text{ radians}$) raises holding force from $200\\text{ N}$ to $1,000\\text{ N}$."], problemText: "Evaluate the friction coefficient constant $\\mu$, and calculate the tension force held when the cable makes three complete loops ($6\\pi\\text{ radians}$) around the anchor drum." }
          ]
        }
      }
    ]
  }
];
