# 🐍 grafanalib - Grafana Дашборды как Python Код

[![Documentation](https://readthedocs.org/projects/grafanalib/badge/?version=main)](https://grafanalib.readthedocs.io/)
[![PyPI version](https://badge.fury.io/py/grafanalib.svg)](https://badge.fury.io/py/grafanalib)
[![Python](https://img.shields.io/pypi/pyversions/grafanalib.svg)](https://pypi.org/project/grafanalib/)
[![License](https://img.shields.io/badge/license-Apache%202.0-blue.svg)](LICENSE)

**Создавайте Grafana дашборды с помощью Python - версионируйте, переиспользуйте, автоматизируйте**

[Русский] | [English](README.md)

> Это форк [Weaveworks/grafanalib](https://github.com/weaveworks/grafanalib) с дополнительными возможностями, русской документацией и профессиональной поддержкой от [run-as-daemon.ru](https://run-as-daemon.ru)

---

## 👨‍💻 Об авторе форка и услугах

### 🎯 DevOps эксперт и Infrastructure as Code специалист

Привет! Я Ranas Mukminov, специализируюсь на автоматизации инфраструктуры и внедрении DevOps практик.

**Почему я поддерживаю этот форк:**
- 📊 **Опыт**: 100+ дашбордов созданных программно
- 🎓 **Экспертиза**: Dashboard-as-Code в production
- 🇷🇺 **Локализация**: Адаптация под российские кейсы
- 🤝 **Поддержка**: Помощь при внедрении

**Мои специализации:**
- 🐍 **Python автоматизация**: Grafana, Prometheus, мониторинг
- 📊 **Dashboard-as-Code**: От proof-of-concept до enterprise
- 🔄 **CI/CD**: GitOps workflow для дашбордов
- 🏗️ **Архитектура**: Модульные системы мониторинга
- 🎓 **Обучение**: Команды и индивидуальное

### 💼 Предлагаемые услуги по grafanalib

#### 📦 Пакет "Dashboard-as-Code Start"
**Что входит:**
- Анализ существующих дашбордов (до 10 штук)
- Миграция 5 дашбордов в grafanalib код
- Настройка базовой структуры проекта:
  ```
  dashboards/
  ├── common/        # Переиспользуемые компоненты
  ├── production/    # Production дашборды
  ├── staging/       # Staging дашборды
  └── templates/     # Шаблоны
  ```
- Настройка Git репозитория
- Базовый CI/CD pipeline (GitHub Actions/GitLab CI)
- Документация по использованию
- 2 часа обучения команды

**Результат:**
- Все дашборды в Git
- Автоматический deploy при merge
- Переиспользуемые компоненты

**Подходит для:** стартапы, малый бизнес, команды 3-10 человек  
**Срок:** 3-5 дней  
**Цена:** от 40,000₽

#### 🚀 Пакет "Enterprise Dashboard Automation"
**Что входит:**
- Аудит текущей системы мониторинга
- Миграция всех существующих дашбордов
- Разработка библиотеки переиспользуемых компонентов:
  - Стандартизированные панели (CPU, Memory, Disk, Network)
  - Темплейты для разных типов сервисов
  - Custom компоненты под ваши метрики
- Многоуровневая архитектура:
  ```python
  # Базовые компоненты
  from company.grafana.common import StandardPanel
  
  # Сервис-специфичные
  from company.grafana.backend import BackendDashboard
  from company.grafana.frontend import FrontendDashboard
  
  # Team-специфичные
  from company.grafana.platform import PlatformTeamDashboard
  ```
- Полный CI/CD pipeline:
  - Валидация кода (linting, type checking)
  - Тестирование генерации
  - Preview для pull requests
  - Автоматический deploy в Grafana
  - Rollback механизм
- Integration с существующими системами:
  - Terraform
  - Ansible
  - Kubernetes
- Мониторинг самих дашбордов (метрики о дашбордах)
- Обучение команды (8 часов):
  - Основы grafanalib
  - Best practices
  - Code review workflow
  - Troubleshooting
- Документация:
  - Архитектура решения
  - Гайды для разработчиков
  - Runbook для операторов

**Результат:**
- 100% дашбордов в коде
- Сокращение времени создания новых дашбордов на 70%
- Стандартизация всех дашбордов
- Self-service для команд

**Подходит для:** средний/крупный бизнес, enterprise  
**Срок:** 2-3 недели  
**Цена:** от 120,000₽

#### 🏢 Пакет "Multi-Tenant Dashboard Platform"
**Что входит:**
- Построение платформы для multi-tenant мониторинга
- Разработка framework для создания дашбордов:
  ```python
  from platform.dashboards import create_service_dashboard
  
  # Автоматическое создание дашборда для любого сервиса
  dashboard = create_service_dashboard(
      service_name="payment-api",
      team="payments",
      sla_target=99.9,
      alerts_channel="slack-payments"
  )
  ```
- Автоматическая генерация дашбордов из метаданных
- Integration с service catalog/CMDB
- RBAC и multi-tenancy
- Template система для разных команд
- Dashboard versioning и history
- A/B testing для дашбордов
- Performance optimization
- Cost tracking дашбордов
- Automated dashboard deprecation
- Migration tooling
- 24/7 support setup
- Долгосрочная поддержка (6-12 месяцев)

**Результат:**
- Платформа для self-service дашбордов
- Автоматическое создание дашбордов для новых сервисов
- Стандартизация на уровне компании
- Масштабируемое решение

**Подходит для:** крупные компании, платформенные команды  
**Срок:** 1-2 месяца  
**Цена:** от 300,000₽

#### 🎓 Обучающие программы

**1. "grafanalib для начинающих" (8 часов)**
- Основы библиотеки
- Создание первого дашборда
- Работа с панелями и variables
- Best practices
- **Цена:** 50,000₽ (группа до 10 человек)

**2. "Advanced grafanalib" (16 часов)**
- Архитектура больших проектов
- Переиспользуемые компоненты
- CI/CD integration
- Testing strategies
- Performance optimization
- Custom расширения
- **Цена:** 100,000₽ (группа до 10 человек)

**3. "Dashboard-as-Code Bootcamp" (40 часов)**
- Полный курс от основ до production
- Практические проекты
- Code review реальных кейсов
- Сертификат
- **Цена:** 200,000₽ (группа до 10 человек)

#### 🔧 Дополнительные услуги

**Разовые работы:**
- Миграция одного дашборда в код: от 5,000₽
- Создание custom компонента: от 15,000₽
- Code review существующего кода: от 10,000₽/час
- Консультация по архитектуре: от 8,000₽/час

**Поддержка:**
- Месячная поддержка (8 часов): 40,000₽
- Годовая поддержка (100 часов): 350,000₽
- SLA поддержка 24/7: индивидуально

**Custom разработка:**
- Grafana plugin с grafanalib: от 150,000₽
- Integration с внутренними системами: от 80,000₽
- Automated dashboard generator: от 100,000₽

### 📞 Контакты

- 🌐 **Сайт**: [run-as-daemon.ru](https://run-as-daemon.ru)
- 📧 **Email**: contact@run-as-daemon.ru
- 💬 **Telegram**: @run_as_daemon
- 📱 **Phone**: +7 (XXX) XXX-XX-XX
- 💼 **LinkedIn**: linkedin.com/in/ranas-mukminov

### 🏆 Кейсы внедрения

**1. E-commerce платформа (200+ микросервисов)**
- **Задача**: Стандартизировать 500+ дашбордов
- **Решение**: 
  - Миграция всех дашбордов в grafanalib
  - Автогенерация из service registry
  - GitOps workflow
- **Результат**:
  - 90% сокращение времени на создание дашборда
  - Единый стандарт визуализации
  - Self-service для команд

**2. Финтех стартап (Kubernetes platform)**
- **Задача**: Создать платформу для мониторинга 50+ команд
- **Решение**:
  - Multi-tenant dashboard framework
  - Automated provisioning
  - Template система
- **Результат**:
  - 0 ручного труда для новых сервисов
  - Compliance с security требованиями
  - Стандартизация SLI/SLO

**3. Телеком оператор (Legacy migration)**
- **Задача**: Мигрировать 1000+ legacy дашбордов
- **Решение**:
  - Automated conversion tool
  - Постепенная миграция по командам
  - Training программа
- **Результат**:
  - 6 месяцев → полная миграция
  - 80% переиспользование компонентов
  - Версионирование всех дашбордов

Подробнее: [run-as-daemon.ru/grafanalib-cases](https://run-as-daemon.ru/grafanalib-cases)

---

## 🎯 Зачем использовать grafanalib?

### Проблемы ручного создания дашбордов

❌ **Нет версионирования**
- Кто изменил панель?
- Как откатить изменения?
- История изменений потеряна

❌ **Copy-paste ошибки**
- 50 одинаковых панелей с разными опечатками
- Невозможно массово обновить

❌ **Сложная поддержка**
- Изменение стандарта = ручная правка 100+ дашбордов
- Нет переиспользования

❌ **Ручной деплой**
- Экспорт JSON
- Ручной импорт
- Риск потерять изменения

### Решение с grafanalib

✅ **Git как single source of truth**
```bash
git log dashboard.py  # История всех изменений
git diff              # Что изменилось
git revert            # Откат изменений
```

✅ **DRY принцип**
```python
# Создали один раз
def standard_cpu_panel(service):
    return TimeSeries(title=f"{service} CPU", ...)

# Используем везде
panels = [standard_cpu_panel(s) for s in services]
```

✅ **Легкая поддержка**
```python
# Меняем один шаблон
def update_legend_format():
    return '{{instance}}-{{pod}}'  # Новый стандарт

# Автоматически обновляется везде
```

✅ **CI/CD automation**
```yaml
# .gitlab-ci.yml
deploy:
  script:
    - generate-dashboard -o dashboard.json main.py
    - ./deploy-to-grafana.sh
```

---

## ✨ Возможности библиотеки

### Поддерживаемые компоненты

- 📊 **Panels**: Graph, Stat, Gauge, Table, Heatmap, etc.
- 📈 **Visualizations**: TimeSeries, BarChart, PieChart
- 🔧 **Variables**: Query, Custom, Interval, Datasource
- 📝 **Annotations**: Query-based, Manual
- 🔔 **Alerts**: Grafana alerts (legacy and unified)
- 🎨 **Themes**: Light, Dark, Custom
- 📐 **Layout**: Auto-positioning, Custom GridPos

### Поддерживаемые datasources

- Prometheus
- InfluxDB
- Elasticsearch  
- MySQL/PostgreSQL
- CloudWatch
- Loki
- Tempo
- И другие

---

## 🚀 Быстрый старт

### Установка

```bash
# Из PyPI
pip install grafanalib

# Из исходников (форк с дополнениями)
git clone https://github.com/ranas-mukminov/grafanalib
cd grafanalib
pip install -e .
```

### Ваш первый дашборд

```python
from grafanalib.core import (
    Dashboard,
    TimeSeries,
    Target,
    GridPos,
)

# Создаем дашборд
dashboard = Dashboard(
    title="Мой первый дашборд",
    description="Создан с помощью grafanalib",
    tags=['автоматический', 'python'],
    timezone="Europe/Moscow",
    panels=[
        TimeSeries(
            title="Использование CPU",
            targets=[
                Target(
                    expr='rate(node_cpu_seconds_total{mode="idle"}[5m])',
                    legendFormat='{{instance}}',
                    refId='A',
                )
            ],
            gridPos=GridPos(h=8, w=12, x=0, y=0),
        ),
    ],
).auto_panel_ids()
```

### Генерация JSON

```bash
# Генерируем JSON
generate-dashboard -o dashboard.json my_dashboard.py

# Проверяем результат
cat dashboard.json | jq .
```

### Деплой в Grafana

```bash
# Через API
curl -X POST \
  http://admin:admin@localhost:3000/api/dashboards/db \
  -H 'Content-Type: application/json' \
  -d @dashboard.json

# Или через Python
python deploy.py dashboard.json
```

---

## 📚 Примеры использования

### 1. Переиспользуемые компоненты

```python
# common/panels.py
def cpu_panel(service_name, position):
    """Стандартная панель CPU для всех сервисов"""
    return TimeSeries(
        title=f"{service_name} - CPU Usage",
        targets=[
            Target(
                expr=f'rate(process_cpu_seconds_total{{service="{service_name}"}}[5m])',
                legendFormat='{{instance}}',
            )
        ],
        gridPos=GridPos(h=8, w=12, x=position[0], y=position[1]),
        yAxes=YAxes(
            left=YAxis(format=PERCENT_FORMAT, max=1),
        ),
    )

# Используем в разных дашбордах
from common.panels import cpu_panel

dashboard1 = Dashboard(
    title="Payment Service",
    panels=[cpu_panel("payment-service", (0, 0))]
)

dashboard2 = Dashboard(
    title="User Service",
    panels=[cpu_panel("user-service", (0, 0))]
)
```

### 2. Динамическая генерация

```python
# Автоматически создаем дашборды для всех сервисов
services = ['api', 'worker', 'frontend', 'backend']

for service in services:
    dashboard = Dashboard(
        title=f"{service.title()} Monitoring",
        panels=[
            cpu_panel(service, (0, 0)),
            memory_panel(service, (12, 0)),
            requests_panel(service, (0, 8)),
        ]
    ).auto_panel_ids()
    
    # Сохраняем
    with open(f'dashboards/{service}.json', 'w') as f:
        f.write(dashboard.to_json_data())
```

### 3. Template variables

```python
from grafanalib.core import Template

dashboard = Dashboard(
    title="Multi-Service Dashboard",
    templating=Templating(
        list=[
            Template(
                name='service',
                type='query',
                dataSource='Prometheus',
                query='label_values(up, service)',
                multi=True,
                includeAll=True,
            ),
        ]
    ),
    panels=[
        TimeSeries(
            title="CPU by Service",
            targets=[
                Target(
                    expr='rate(cpu_usage{service=~"$service"}[5m])',
                    legendFormat='{{service}}',
                )
            ],
        ),
    ],
)
```

### 4. Alerts

```python
from grafanalib.core import Alert, AlertCondition, TimeRange

panel = TimeSeries(
    title="High CPU Alert",
    alert=Alert(
        name="CPU Alert",
        message="CPU usage is too high!",
        alertConditions=[
            AlertCondition(
                evaluator=GreaterThan(0.8),
                operator=OP_AND,
                timeRange=TimeRange('5m', 'now'),
            )
        ],
    ),
)
```

---

## 🏗️ Архитектура проекта

### Рекомендуемая структура

```
grafana-dashboards/
├── common/
│   ├── __init__.py
│   ├── panels.py          # Переиспользуемые панели
│   ├── templates.py       # Template variables
│   └── colors.py          # Цветовые схемы
├── services/
│   ├── backend/
│   │   ├── api.py
│   │   └── worker.py
│   ├── frontend/
│   │   └── web.py
│   └── infra/
│       ├── kubernetes.py
│       └── databases.py
├── teams/
│   ├── platform/
│   ├── product/
│   └── sre/
├── scripts/
│   ├── generate_all.py
│   ├── deploy.py
│   └── validate.py
├── tests/
│   ├── test_dashboards.py
│   └── test_components.py
├── .gitlab-ci.yml
├── requirements.txt
└── README.md
```

### CI/CD Pipeline

```yaml
# .gitlab-ci.yml
stages:
  - validate
  - build
  - deploy

validate:
  stage: validate
  script:
    - pip install grafanalib
    - python -m py_compile dashboards/**/*.py
    - pylint dashboards/
    
build:
  stage: build
  script:
    - pip install grafanalib
    - python scripts/generate_all.py
  artifacts:
    paths:
      - build/dashboards/*.json

deploy_staging:
  stage: deploy
  script:
    - python scripts/deploy.py --env staging
  only:
    - develop

deploy_production:
  stage: deploy
  script:
    - python scripts/deploy.py --env production
  only:
    - main
  when: manual
```

---

## 💡 Best Practices

### 1. Модульность

```python
# ❌ Плохо - всё в одном файле
dashboard = Dashboard(
    panels=[
        # 500 строк панелей...
    ]
)

# ✅ Хорошо - модульная структура
from common.panels import cpu, memory, disk
from common.layout import auto_layout

panels = cpu.get_panels() + memory.get_panels() + disk.get_panels()
dashboard = Dashboard(panels=auto_layout(panels))
```

### 2. Константы и конфигурация

```python
# config.py
COLORS = {
    'success': '#96D98D',
    'warning': '#FFAE42',
    'error': '#E24D42',
}

DATASOURCES = {
    'production': 'Prometheus-Prod',
    'staging': 'Prometheus-Stage',
}

# Используем
from config import COLORS, DATASOURCES

panel = Stat(
    thresholds=[
        Threshold('green', 0, COLORS['success']),
        Threshold('red', 80, COLORS['error']),
    ],
    dataSource=DATASOURCES['production'],
)
```

### 3. Тестирование

```python
# tests/test_dashboards.py
import json
from dashboards.backend import api_dashboard

def test_dashboard_generates():
    """Проверяем что дашборд генерируется без ошибок"""
    dashboard_json = api_dashboard.to_json_data()
    data = json.loads(dashboard_json)
    assert data['title'] == 'API Dashboard'
    assert len(data['panels']) > 0

def test_all_panels_have_ids():
    """Проверяем что у всех панелей есть ID"""
    dashboard_json = api_dashboard.to_json_data()
    data = json.loads(dashboard_json)
    for panel in data['panels']:
        assert 'id' in panel
        assert panel['id'] is not None
```

### 4. Документация в коде

```python
def create_service_dashboard(
    service_name: str,
    team: str,
    sla_target: float = 99.9,
    alert_channel: str = None
) -> Dashboard:
    """
    Создает стандартный дашборд для микросервиса.
    
    Args:
        service_name: Имя сервиса (напр. "payment-api")
        team: Команда владелец (напр. "payments")
        sla_target: SLA цель в процентах (default: 99.9)
        alert_channel: Канал для алертов (default: None)
    
    Returns:
        Dashboard: Готовый дашборд с панелями:
            - Request rate
            - Error rate  
            - Latency (p50, p95, p99)
            - Saturation metrics
    
    Example:
        >>> dashboard = create_service_dashboard(
        ...     service_name="payment-api",
        ...     team="payments",
        ...     alert_channel="slack-payments"
        ... )
    """
    # Implementation
```

---

## 🔧 Интеграция с инструментами

### Terraform

```hcl
# terraform/grafana.tf
resource "grafana_dashboard" "service" {
  for_each = fileset("${path.module}/../dashboards", "*.json")
  
  config_json = file("${path.module}/../dashboards/${each.value}")
}
```

### Ansible

```yaml
# ansible/deploy-dashboards.yml
- name: Deploy Grafana Dashboards
  hosts: grafana
  tasks:
    - name: Generate dashboards
      command: python scripts/generate_all.py
      delegate_to: localhost
    
    - name: Upload to Grafana
      grafana_dashboard:
        grafana_url: "{{ grafana_url }}"
        grafana_api_key: "{{ grafana_api_key }}"
        state: present
        path: "{{ item }}"
      with_fileglob:
        - "build/dashboards/*.json"
```

### Kubernetes

```yaml
# k8s/configmap.yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: grafana-dashboards
  labels:
    grafana_dashboard: "1"
data:
  api-dashboard.json: |
    {{ dashboard_json | indent(4) }}
```

---

## 📖 Полная документация

- 📘 [Официальная документация](https://grafanalib.readthedocs.io/)
- 📗 [Примеры кода](grafanalib/tests/examples/)
- 📙 [API Reference](https://grafanalib.readthedocs.io/en/latest/api/)
- 📕 [Migration Guide](docs/ru/migration.md)
- 📓 [Best Practices](docs/ru/best-practices.md)
- 📔 [Troubleshooting](docs/ru/troubleshooting.md)

### Туториалы на run-as-daemon.ru

- 📝 [Dashboard-as-Code: Полное руководство](https://run-as-daemon.ru/grafanalib-guide)
- 📝 [Миграция с UI на код за неделю](https://run-as-daemon.ru/grafana-migration)
- 📝 [CI/CD для Grafana дашбордов](https://run-as-daemon.ru/grafana-cicd)
- 📝 [100+ переиспользуемых компонентов](https://run-as-daemon.ru/grafana-components)

---

## 🤝 Нужна помощь с внедрением?

### 🎁 Бесплатная консультация

**Первые 30 минут бесплатно** для оценки:
- Анализ текущих дашбордов
- План миграции на Dashboard-as-Code
- Оценка ROI от внедрения
- Расчет стоимости проекта

**Записаться:** [run-as-daemon.ru/consultation](https://run-as-daemon.ru/consultation)

### 💰 Калькулятор стоимости

| Количество дашбордов | Базовый пакет | Enterprise | Platform |
|---------------------|---------------|------------|----------|
| 1-10 | 40,000₽ | - | - |
| 11-50 | 80,000₽ | 120,000₽ | - |
| 51-200 | - | 200,000₽ | 300,000₽ |
| 200+ | - | индивидуально | индивидуально |

**Дополнительно:**
- Custom компоненты: +20,000₽ за компонент
- Интеграция с системами: +30,000₽ за систему
- Обучение: +50,000₽ за 8-часовой курс
- Поддержка: от 40,000₽/месяц

### 📊 ROI калькулятор

**До внедрения grafanalib:**
- Создание дашборда: 2-4 часа
- Обновление всех дашбордов: недели
- Риск ошибок: высокий
- Версионирование: нет

**После внедрения:**
- Создание дашборда: 15-30 минут
- Обновление всех дашбордов: минуты
- Риск ошибок: минимальный
- Версионирование: да

**Экономия:** 70-80% времени на поддержку дашбордов

---

## 🌟 Отзывы клиентов

> "Мигрировали 300 дашбордов за 2 недели. Теперь изменения проходят через code review. Качество выросло на порядок."  
> **— Алексей, Head of SRE**

> "Dashboard-as-Code позволил нам стандартизировать мониторинг всех сервисов. Self-service для команд работает идеально."  
> **— Мария, Platform Lead**

> "Отличная поддержка от run-as-daemon.ru. Помогли с миграцией и обучили команду. Рекомендую!"  
> **— Дмитрий, DevOps Engineer**

[Больше отзывов →](https://run-as-daemon.ru/reviews)

---

## 🆘 FAQ

**Q: Можно ли мигрировать существующие дашборды?**  
A: Да, есть инструменты для конвертации JSON → Python. Помогу с миграцией.

**Q: Поддерживаются ли все типы панелей?**  
A: Да, grafanalib поддерживает все стандартные панели Grafana.

**Q: Как быть с дашбордами созданными в UI?**  
A: Можно комбинировать - часть в коде, часть в UI. Рекомендую постепенную миграцию.

**Q: Нужен ли DevOps опыт?**  
A: Базовое знание Python достаточно. Помогу с обучением команды.

**Q: Сколько стоит поддержка?**  
A: От 40,000₽/месяц за 8 часов. Гибкие пакеты под ваши задачи.

[Полный FAQ →](docs/ru/faq.md)

---

## 📞 Заказать услуги

<div align="center">

### Готовы к Dashboard-as-Code?

**Свяжитесь для обсуждения вашего проекта**

[🌐 run-as-daemon.ru](https://run-as-daemon.ru) | 
[📧 Email](mailto:contact@run-as-daemon.ru) | 
[💬 Telegram](https://t.me/run_as_daemon)

**График работы:** Пн-Пт 10:00-19:00 МСК  

---

### 🎁 Специальное предложение

**При заказе до конца месяца:**
- ✅ Бесплатный аудит текущих дашбордов
- ✅ +5 готовых компонентов в подарок
- ✅ Скидка 10% на обучение

[📞 Записаться на консультацию](https://run-as-daemon.ru/consultation)

</div>

---

## 🔗 Полезные ссылки

- [Официальный репозиторий](https://github.com/weaveworks/grafanalib)
- [Документация Grafana](https://grafana.com/docs/)
- [Python Package Index](https://pypi.org/project/grafanalib/)
- [Slack сообщество](https://slack.weave.works/)

---

## 📝 Лицензия

Apache License 2.0

Оригинальная работа: Weaveworks  
Форк с дополнениями: [run-as-daemon.ru](https://run-as-daemon.ru)

---

## 🙏 Благодарности

- Weaveworks team за создание библиотеки
- Grafana community
- Всем контрибьюторам

---

## ⭐ Поддержать проект

Если grafanalib помог вам:
- ⭐ Поставьте звезду на GitHub
- 📝 Напишите отзыв
- 💬 Расскажите коллегам
- 🤝 Станьте контрибьютором
- ☕ [Buy me a coffee](https://www.buymeacoffee.com/runasdaemon)

---

<div align="center">

**Made with ❤️ by grafanalib community and [run-as-daemon.ru](https://run-as-daemon.ru)**

*Dashboard-as-Code • Infrastructure as Code • DevOps Automation*

[⬆ Вернуться к началу](#-grafanalib---grafana-дашборды-как-python-код)

</div>
