RULE_NAMES = [
    "AC-graph",
    "PY-graph",
    "PL-graph",
    "FC-graph",
    "AC-abr",
    "PY-abr",
    "BU-abr",
    "PL-abr",
    "FC-abr",
    "Axis",
]

RULE_LABELS = {
    "AC-graph": "Actual Graph",
    "PY-graph": "Previous Year Graph",
    "PL-graph": "Plan Graph",
    "FC-graph": "Forecast Graph",
    "AC-abr": "Actual Abbreviation",
    "PY-abr": "Previous Year Abbreviation",
    "BU-abr": "Budget Abbreviation",
    "PL-abr": "Plan Abbreviation",
    "FC-abr": "Forecast Abbreviation",
    "Axis": "Axis",
}

RULE_EXPLANATIONS = {
    "AC-graph": {
        "correct": "Actual values use the expected dark solid visual style.",
        "incorrect": "Actual values should use a dark solid visual style so they are clearly distinguishable from other scenarios.",
    },
    "PY-graph": {
        "correct": "Previous Year values use a suitable lighter comparison style.",
        "incorrect": "Previous Year values should use a lighter visual style than Actual values to make historical comparison clear.",
    },
    "PL-graph": {
        "correct": "Plan values use the expected outlined visual style.",
        "incorrect": "Plan values should use outlined shapes instead of filled shapes according to IBCS notation.",
    },
    "FC-graph": {
        "correct": "Forecast values use the expected patterned visual style.",
        "incorrect": "Forecast values should use a hatched or patterned style to separate them from actual and planned values.",
    },
    "AC-abr": {
        "correct": "The Actual abbreviation is used correctly.",
        "incorrect": "The Actual abbreviation should be written consistently as AC.",
    },
    "PY-abr": {
        "correct": "The Previous Year abbreviation is used correctly.",
        "incorrect": "The Previous Year abbreviation should be written consistently as PY.",
    },
    "BU-abr": {
        "correct": "The Budget abbreviation is used correctly.",
        "incorrect": "The Budget abbreviation should be written consistently as BU.",
    },
    "PL-abr": {
        "correct": "The Plan abbreviation is used correctly.",
        "incorrect": "The Plan abbreviation should be written consistently as PL.",
    },
    "FC-abr": {
        "correct": "The Forecast abbreviation is used correctly.",
        "incorrect": "The Forecast abbreviation should be written consistently as FC.",
    },
    "Axis": {
        "correct": "The axis labeling follows the expected semantic structure.",
        "incorrect": "The axis labeling should be reviewed so the meaning, units, and scenario information are clear.",
    },
}

