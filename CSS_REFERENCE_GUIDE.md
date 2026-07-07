# 📱 Responsive Navbar - Complete CSS Reference

## Quick Reference for All Responsive Styles

### 🎯 Mobile Breakpoints Quick Guide

```css
/* Extra Small Phones (360px and below) */
@media (max-width: 360px) {
  .navbar { height: 52px; }
  .navbar-logo-short { width: 30px; height: 30px; font-size: 16px; }
  .navbar-toggle-btn { font-size: 18px; }
}

/* Small Phones (480px and below) */
@media (max-width: 480px) {
  .navbar { height: 56px; }
  .navbar-logo-short { width: 35px; height: 35px; font-size: 20px; }
  .navbar-toggle-btn { display: flex !important; }
}

/* Tablets (768px and below) */
@media (max-width: 768px) {
  .navbar { height: 56px; }
  .navbar-toggle-btn { display: flex !important; }
  .navbar-logo-full { display: none; }
  .navbar-logo-short { display: flex !important; width: 40px; height: 40px; }
}

/* Laptops (769px and above) */
@media (min-width: 769px) {
  .navbar { height: 60px; }
  .navbar-toggle-btn { display: none !important; }
  .navbar-logo-full { display: inline-block !important; }
  .navbar-logo-short { display: none !important; }
}
```

---

## 🎨 Theme Colors - Copy & Paste

### Doctor Theme
```css
body.doctor-theme-navbar .navbar {
  background-color: #a8d8ff !important;
}

body.doctor-theme-navbar .navbar-logo-short {
  background: linear-gradient(135deg, #1e88e5 0%, #1565c0 100%) !important;
  color: #ffffff !important;
  box-shadow: 0 2px 8px rgba(30, 136, 229, 0.3) !important;
}

body.doctor-theme-navbar .navbar-toggle-btn {
  color: #0d47a1 !important;
}
```

### Patient Theme
```css
body.patient-theme-navbar .navbar {
  background-color: #8af5aaff !important;
}

body.patient-theme-navbar .navbar-logo-short {
  background: linear-gradient(135deg, #00897b 0%, #00695c 100%) !important;
  color: #ffffff !important;
  box-shadow: 0 2px 8px rgba(0, 137, 123, 0.3) !important;
}

body.patient-theme-navbar .navbar-toggle-btn {
  color: #00695c !important;
}
```

### Nurse Theme
```css
body.nurse-theme-navbar .navbar {
  background-color: #ffd6e7 !important;
}

body.nurse-theme-navbar .navbar-logo-short {
  background: linear-gradient(135deg, #9c27b0 0%, #7b1fa2 100%) !important;
  color: #ffffff !important;
  box-shadow: 0 2px 8px rgba(156, 39, 176, 0.3) !important;
}

body.nurse-theme-navbar .navbar-toggle-btn {
  color: #c2185b !important;
}
```

### Assistant Theme
```css
body.assistant-theme-navbar .navbar {
  background-color: #e0d1ff !important;
}

body.assistant-theme-navbar .navbar-logo-short {
  background: linear-gradient(135deg, #7b1fa2 0%, #6a1b9a 100%) !important;
  color: #ffffff !important;
  box-shadow: 0 2px 8px rgba(123, 31, 162, 0.3) !important;
}

body.assistant-theme-navbar .navbar-toggle-btn {
  color: #7b1fa2 !important;
}
```

### Technician Theme
```css
body.technician-theme-navbar .navbar {
  background-color: #ffe4c9 !important;
}

body.technician-theme-navbar .navbar-logo-short {
  background: linear-gradient(135deg, #f4511e 0%, #d84315 100%) !important;
  color: #ffffff !important;
  box-shadow: 0 2px 8px rgba(244, 81, 30, 0.3) !important;
}

body.technician-theme-navbar .navbar-toggle-btn {
  color: #f57c00 !important;
}
```

### Housekeeping Theme
```css
body.housekeeping-theme-navbar .navbar {
  background-color: #fff9c9 !important;
}

body.housekeeping-theme-navbar .navbar-logo-short {
  background: linear-gradient(135deg, #cddc39 0%, #afb42b 100%) !important;
  color: #ffffff !important;
  box-shadow: 0 2px 8px rgba(175, 180, 43, 0.3) !important;
}

body.housekeeping-theme-navbar .navbar-toggle-btn {
  color: #f9a825 !important;
}
```

### Supervisor Theme
```css
body.supervisor-theme-navbar .navbar {
  background-color: #b2ebf2 !important;
}

body.supervisor-theme-navbar .navbar-logo-short {
  background: linear-gradient(135deg, #26c6da 0%, #00acc1 100%) !important;
  color: #ffffff !important;
  box-shadow: 0 2px 8px rgba(0, 172, 193, 0.3) !important;
}

body.supervisor-theme-navbar .navbar-toggle-btn {
  color: #00838f !important;
}
```

### Manager Theme
```css
body.manager-theme-navbar .navbar {
  background-color: #e6e6ff !important;
}

body.manager-theme-navbar .navbar-logo-short {
  background: linear-gradient(135deg, #5c6bc0 0%, #3f51b5 100%) !important;
  color: #ffffff !important;
  box-shadow: 0 2px 8px rgba(63, 81, 181, 0.3) !important;
}

body.manager-theme-navbar .navbar-toggle-btn {
  color: #3949ab !important;
}
```

### Billing Theme
```css
body.billing-theme-navbar .navbar {
  background-color: #c8f7c5 !important;
}

body.billing-theme-navbar .navbar-logo-short {
  background: linear-gradient(135deg, #9ccc65 0%, #7cb342 100%) !important;
  color: #ffffff !important;
  box-shadow: 0 2px 8px rgba(124, 179, 66, 0.3) !important;
}

body.billing-theme-navbar .navbar-toggle-btn {
  color: #388e3c !important;
}
```

### Admin Theme
```css
body.admin-theme-navbar .navbar {
  background-color: #e3f2fd !important;
}

body.admin-theme-navbar .navbar-logo-short {
  background: linear-gradient(135deg, #78909c 0%, #607d8b 100%) !important;
  color: #ffffff !important;
  box-shadow: 0 2px 8px rgba(96, 125, 139, 0.3) !important;
}

body.admin-theme-navbar .navbar-toggle-btn {
  color: #1976d2 !important;
}
```

### Super Admin Theme (Premium Gold)
```css
body.superadmin-theme-navbar .navbar {
  background: linear-gradient(135deg, #fff9c2 0%, #ffec8b 100%) !important;
  border-bottom: 3px solid #ffd700 !important;
  box-shadow: 0 4px 15px rgba(255, 215, 0, 0.3) !important;
}

body.superadmin-theme-navbar .navbar-logo-short {
  background: linear-gradient(135deg, #ffd54f 0%, #ffb300 100%) !important;
  color: #000000 !important;
  box-shadow: 0 0 10px rgba(255, 215, 0, 0.5) !important;
  font-weight: 700;
}

body.superadmin-theme-navbar .navbar-toggle-btn {
  color: #000000 !important;
  font-weight: 700;
}

body.superadmin-theme-navbar .fa-bell {
  color: #ff8f00 !important;
  text-shadow: 0 0 3px rgba(255, 215, 0, 0.5);
}

body.superadmin-theme-navbar .profile img {
  border: 3px solid #ffd700 !important;
  box-shadow: 0 0 10px rgba(255, 215, 0, 0.5) !important;
}

body.superadmin-theme-navbar .notification-badge {
  background: linear-gradient(135deg, #ff0000 0%, #cc0000 100%) !important;
  box-shadow: 0 0 8px rgba(255, 0, 0, 0.5) !important;
  font-weight: 700 !important;
}
```

---

## 🔧 Toggle Button Styling

```css
/* Base Toggle Button */
.navbar-toggle-btn {
  display: none !important;
  background: transparent !important;
  border: none !important;
  font-size: 24px !important;
  cursor: pointer !important;
  padding: 5px !important;
  margin-right: 10px !important;
  transition: all 0.3s ease !important;
}

.navbar-toggle-btn:hover {
  transform: scale(1.2) !important;
}

/* Show on mobile */
@media (max-width: 768px) {
  .navbar-toggle-btn {
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
  }
}
```

---

## 🏷️ Logo Badge Styling

```css
/* "M" Logo Badge */
.navbar-logo-short {
  display: none;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: 700;
  border-radius: 8px;
  transition: all 0.3s ease;
  margin-right: 8px;
}

/* Show on tablets and mobile */
@media (max-width: 768px) {
  .navbar-logo-short {
    display: flex !important;
    width: 40px;
    height: 40px;
    font-size: 20px;
  }
}

/* Mobile sizing */
@media (max-width: 480px) {
  .navbar-logo-short {
    width: 35px !important;
    height: 35px !important;
    font-size: 18px !important;
  }
}

/* Extra small phones */
@media (max-width: 360px) {
  .navbar-logo-short {
    width: 30px !important;
    height: 30px !important;
    font-size: 16px !important;
  }
}
```

---

## 📱 Sidebar Responsive

```css
/* Mobile Sidebar - Slide from left */
@media (max-width: 768px) {
  .sidebar-container {
    width: 250px;
    height: calc(100vh - 56px);
    position: fixed;
    left: 0;
    top: 56px;
    z-index: 998;
    transform: translateX(-100%);
    transition: transform 0.3s ease;
    box-shadow: 2px 0 10px rgba(0, 0, 0, 0.2);
  }

  .sidebar-container.hover-expanded {
    transform: translateX(0);
  }
}

/* Desktop Sidebar - Always visible */
@media (min-width: 769px) {
  .sidebar-container {
    position: fixed;
    left: 0;
    top: 60px;
    width: 250px;
    height: calc(100vh - 60px);
    transform: translateX(0);
    z-index: 9;
  }
}

/* Right content margin */
@media (min-width: 769px) {
  .right-side-content {
    margin-left: 250px;
  }
}

@media (max-width: 768px) {
  .right-side-content {
    margin-left: 0;
    width: 100%;
  }
}
```

---

## 🎬 Animations

```css
/* Pulse animation for badges */
@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.2);
    opacity: 0.7;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

/* Gold glow for Super Admin */
@keyframes goldGlow {
  0% {
    box-shadow: 0 0 5px rgba(255, 215, 0, 0.5);
  }
  100% {
    box-shadow: 0 0 15px rgba(255, 215, 0, 0.8);
  }
}

/* Crown animation for Super Admin */
@keyframes crownGlow {
  0% {
    filter: drop-shadow(0 0 2px rgba(255, 215, 0, 0.5));
    transform: scale(1);
  }
  100% {
    filter: drop-shadow(0 0 8px rgba(255, 215, 0, 0.8));
    transform: scale(1.1);
  }
}
```

---

## 📋 Size Reference Table

| Device | Screen | Navbar | Logo | Toggle |
|--------|--------|--------|------|--------|
| Extra Small Phone | 360px | 52px | 30px | 18px |
| Small Phone | 480px | 56px | 35px | 20px |
| Large Phone | 600px | 56px | 40px | 24px |
| Tablet | 768px | 56px | 40px | 24px |
| Laptop | 1024px | 60px | Full | Hidden |
| Desktop | 1920px | 60px | Full | Hidden |

---

## ✅ Testing Checklist

- [ ] Desktop (1920px) - Full logo shows
- [ ] Laptop (1366px) - Full logo shows
- [ ] Tablet (768px) - M logo shows
- [ ] Mobile (480px) - M logo shows (35px)
- [ ] Extra Small (360px) - M logo shows (30px)
- [ ] Toggle button hidden on desktop
- [ ] Toggle button visible on mobile
- [ ] Sidebar slides on mobile
- [ ] Theme colors apply to all elements
- [ ] Super Admin gold theme is premium
- [ ] No horizontal scroll on any device
- [ ] Smooth transitions/animations

---

**Last Updated**: February 5, 2026
