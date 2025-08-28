# 📊 Factureo

**Factureo** es un sistema de gestión empresarial que permite a empresas y clientes interactuar dentro de una plataforma centralizada.  
Las empresas pueden manejar inventario, emitir facturas, gestionar nóminas y llevar control contable, mientras que los clientes pueden consultar sus facturas y relacionarse con las empresas.

---

## 🚀 Tecnologías principales
- **Backend:** Django + Django REST Framework  
- **Frontend:** React + Bootstrap  
- **Base de datos:** PostgreSQL (en fases avanzadas)  
- **Autenticación:** JWT + Google OAuth2  

---

## 🔹 Fases del proyecto
- **Fase 0:** Configuración inicial del proyecto y README ✅  
- **Fase 1:** Backend con Django  
  - Sistema de usuarios con roles (**empresa**, **cliente**, **admin**)  
  - API con JWT para login/registro  
  - Integración con Google OAuth2  
- **Fase 2:** Frontend con React + Bootstrap  
  - Pantallas de registro/login  
  - Dashboard con vistas personalizadas según rol  
- **Fase 3:** Módulos de negocio  
  - **Inventario** → Gestión de productos y servicios (empresa)  
  - **Facturación** → Emisión y control de facturas (empresa → cliente)  
  - **Nóminas** → Gestión de empleados y pagos (empresa)  
  - **Contabilidad** → Control financiero de ingresos y egresos (empresa)  

---

## 📂 Estructura inicial del proyecto
factureo/
│── factureo_backend/ # Proyecto Django (API + DB)
│── factureo_frontend/ # Proyecto React (UI)
│── README.md


---

## 🔧 Requisitos previos
- Python 3.12+  
- Node.js 18+  
- PostgreSQL (opcional en fases iniciales, obligatorio en fases avanzadas)  
- Git  

---

## ▶️ Cómo iniciar el proyecto
1. Clonar el repositorio:
   ```bash
   git clone https://github.com/andresforero1033/factureo.git
   cd factureo


---

## 🔧 Requisitos previos
- Python 3.12+  
- Node.js 18+  
- PostgreSQL (opcional en fases iniciales, obligatorio en fases avanzadas)  
- Git  

---

## ▶️ Cómo iniciar el proyecto
1. Clonar el repositorio:
   ```bash
   git clone https://github.com/andresforero1033/factureo.git
   cd factureo


cd factureo_backend
python -m venv venv
source venv/bin/activate  # en Windows: venv\Scripts\activate
pip install -r requirements.txt

cd factureo_frontend
npm install
npm start



---

### 🔹 Paso 2: Añadir y hacer commit
En tu terminal dentro de `factureo/`:

```powershell
git add README.md
git commit -m "Fase 0.2: Agregado README con documentación inicial"
