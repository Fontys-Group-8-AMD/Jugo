from app.services.inference_service import InferenceService


def create_service_without_model() -> InferenceService:
    service = InferenceService.__new__(InferenceService)
    service.threshold = 0.5
    return service


def test_build_rule_prediction_marks_high_probability_as_non_compliant():
    service = create_service_without_model()

    result = service._build_rule_prediction("AC-graph", 0.8)

    assert result["prediction"] == 1
    assert result["status"] == "non-compliant"
    assert result["probability_non_compliant"] == 0.8
    assert result["probability_compliant"] == 0.2


def test_build_rule_prediction_marks_low_probability_as_compliant():
    service = create_service_without_model()

    result = service._build_rule_prediction("AC-graph", 0.2)

    assert result["prediction"] == 0
    assert result["status"] == "compliant"
    assert result["probability_non_compliant"] == 0.2
    assert result["probability_compliant"] == 0.8


def test_build_scenario_checks_returns_only_groups_with_issues():
    service = create_service_without_model()

    rules = [
        {"rule": "AC-graph", "status": "non-compliant"},
        {"rule": "AC-abr", "status": "compliant"},
        {"rule": "PY-graph", "status": "compliant"},
    ]

    result = service._build_scenario_checks(rules)

    assert result == [
        {
            "label": "Actual",
            "evaluated": True,
            "status": "non-compliant",
        }
    ]


def test_build_issues_returns_only_non_compliant_rule_issues():
    service = create_service_without_model()

    rules = [
        {
            "label": "Actual Graph",
            "status": "non-compliant",
            "explanation": "Actual values should use a dark solid visual style.",
        },
        {
            "label": "Previous Year Graph",
            "status": "compliant",
            "explanation": "Previous Year values use a suitable lighter comparison style.",
        },
    ]

    result = service._build_issues(rules)

    assert result == [
        {
            "message": (
                "Actual Graph is non-compliant. "
                "Actual values should use a dark solid visual style."
            ),
            "severity": "high",
        }
    ]


def test_build_suggestions_returns_compliant_suggestions_when_no_issues():
    service = create_service_without_model()

    result = service._build_suggestions(issues=[], rules=[])

    assert len(result) > 0
    assert "compliant" in result[0].lower()


def test_build_suggestions_returns_non_compliant_rule_explanations():
    service = create_service_without_model()

    rules = [
        {
            "status": "non-compliant",
            "explanation": "Actual values should use a dark solid visual style.",
        }
    ]

    result = service._build_suggestions(
        issues=[{"message": "Issue detected.", "severity": "high"}],
        rules=rules,
    )

    assert "Actual values should use a dark solid visual style." in result