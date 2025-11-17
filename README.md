# 🐍 grafanalib - Grafana Dashboards as Python Code

[![Documentation](https://readthedocs.org/projects/grafanalib/badge/?version=main)](https://grafanalib.readthedocs.io/)
[![PyPI version](https://badge.fury.io/py/grafanalib.svg)](https://badge.fury.io/py/grafanalib)
[![Python Versions](https://img.shields.io/pypi/pyversions/grafanalib.svg)](https://pypi.org/project/grafanalib/)
[![License](https://img.shields.io/badge/license-Apache%202.0-blue.svg)](LICENSE)

**Build Grafana dashboards with Python - version control, reuse, and automate your monitoring**

[English] | [Русский](README.ru.md)

> This is a fork of [Weaveworks/grafanalib](https://github.com/weaveworks/grafanalib) with additional features, Russian documentation, and professional support.

---

## 🎯 Why grafanalib?

Do you:
- ✅ Want to **version control** your Grafana dashboards?
- ✅ Need to **reuse common patterns** across dashboards?
- ✅ Want to **automate** dashboard deployment?
- ✅ Prefer **code over clicking** in UI?
- ✅ Need **consistency** across multiple dashboards?

**Then grafanalib is for you!**

### Benefits over Manual Dashboard Creation

| Manual UI | grafanalib |
|-----------|------------|
| ❌ No version control | ✅ Git-tracked changes |
| ❌ Copy-paste errors | ✅ Reusable components |
| ❌ Hard to maintain | ✅ Easy refactoring |
| ❌ Manual deployment | ✅ CI/CD integration |
| ❌ No code review | ✅ Pull request workflow |

---

## ✨ Features

- 🐍 **Python-based**: Write dashboards in Python
- 📦 **Modular**: Create reusable components
- 🔄 **Version Control**: Track changes in Git
- 🚀 **CI/CD Ready**: Automate deployment
- 📊 **Rich Library**: Panels, variables, annotations
- 🎨 **Customizable**: Full Grafana API coverage
- 🔌 **Extensible**: Add custom components

---

## 🚀 Quick Start

### Installation

```bash
pip install grafanalib
```

### Your First Dashboard

```python
from grafanalib.core import (
    Dashboard, TimeSeries, Target, GridPos
)

dashboard = Dashboard(
    title="My First Dashboard",
    panels=[
        TimeSeries(
            title="CPU Usage",
            targets=[
                Target(
                    expr='rate(cpu_usage_seconds[5m])',
                    legendFormat='{{instance}}',
                )
            ],
            gridPos=GridPos(h=8, w=12, x=0, y=0),
        ),
    ],
).auto_panel_ids()
```

### Generate JSON

```bash
generate-dashboard -o dashboard.json my_dashboard.py
```

### Deploy to Grafana

```bash
curl -X POST http://grafana:3000/api/dashboards/db \
  -H "Content-Type: application/json" \
  -d @dashboard.json
```

---

## 📚 Documentation

- [Official Documentation](https://grafanalib.readthedocs.io/)
- [Examples](grafanalib/tests/examples/)
- [API Reference](https://grafanalib.readthedocs.io/en/latest/api/)

---

## 🤝 Professional Services

Need help implementing Dashboard-as-Code in your organization?

### Available Services:
- ✅ **Migration**: Convert existing dashboards to code
- ✅ **Training**: Team workshops on grafanalib
- ✅ **Custom Components**: Build reusable libraries for your needs
- ✅ **CI/CD Integration**: Automate dashboard deployment
- ✅ **Consulting**: Best practices and architecture

**Contact**: [run-as-daemon.ru](https://run-as-daemon.ru)

---

## 📄 License

Apache License 2.0

Original work by Weaveworks  
Fork maintained by [run-as-daemon.ru](https://run-as-daemon.ru)

---

**Made with ❤️ by the grafanalib community and [run-as-daemon.ru](https://run-as-daemon.ru)**









