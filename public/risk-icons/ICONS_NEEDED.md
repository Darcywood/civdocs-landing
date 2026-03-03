# Risk Assessment Icons

Create these icons and save them in this folder (`public/risk-icons/`). Use **PNG** format, **48×48px** or **64×64px** recommended. Name each file exactly as shown (e.g. `crushing-collision.png`).

The PDF will use these to display hazard icons next to each treatment block in Section 5.

---

## Icon List

| Filename | Hazard(s) | Description |
|----------|-----------|-------------|
| `crushing-collision.png` | CRUSHING, CRUSHING + COLLISION | Warning triangle with exclamation mark. Used for crushing/collision hazards. |
| `striking-burns.png` | STRIKING, BURNS, STRIKING + BURNS | Protective hand or glove with lightning/spray. Used for striking and burn hazards. |
| `poor-visibility.png` | POOR VISIBILITY, POOR VISIBILITY + COLLISION | Lightbulb. Used for visibility/lighting hazards. |
| `neutral-start.png` | CRUSHING + ENTANGLEMENT + STRIKING + COLLISION | Square with capital "N". Used for neutral start / multiple mechanical hazards. |
| `operational-malfunction.png` | OPERATIONAL MALFUNCTION | Open book. Used for manuals, procedures, operational issues. |
| `non-compliance.png` | NON COMPLIANCE | Warning/caution symbol. Used for compliance-related hazards. |
| `instability-collision.png` | INSTABILITY, INSTABILITY + COLLISION | Unstable/tipping icon. Used for instability and collision. |
| `structural-damage.png` | CURRENT OR PREVIOUS STRUCTURAL DAMAGE | Crack or damage symbol. Used for structural integrity. |
| `incorrect-operation.png` | INCORRECT OPERATION | Operator/control symbol. Used for operation and training. |
| `entrapment.png` | ENTRAPMENT | Entrapment/pinch point symbol. |
| `falling.png` | FALLING | Person falling or fall hazard. |
| `slipping.png` | SLIPPING | Slippery surface or slip hazard. |
| `hearing-protection.png` | HEARING LOSS | Ear with sound waves or ear defenders. |
| `heat-stroke.png` | HEAT STROKE, DEHYDRATION | Sun/thermometer or person overheating. |
| `collision.png` | COLLISION | Vehicle/object collision symbol. |
| `fire.png` | FIRE | Flame icon. |
| `entanglement.png` | ENTANGLEMENT | Rotating parts or entanglement hazard. |
| `electric-shock.png` | ELECTRIC SHOCK | Lightning bolt or electric hazard. |

---

## Optional (for reverse alarm, mirrors, etc.)

| Filename | Use case |
|----------|----------|
| `reverse-alarm.png` | Bell with sound waves – reverse movement alarm |
| `operator-mirrors.png` | Mirror with "if you can't see YOU" – operator mirrors |

---

## Usage

Once icons are in place, the generate API will load them and pass to the PDF. Icons are matched by hazard type; if no icon exists, a letter placeholder is shown.
