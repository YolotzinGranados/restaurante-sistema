-- =========================================================
-- Sistema de Gestión de Restaurante - Esquema de Base de Datos
-- Motor: MySQL 8+
-- Módulos: Empleados, Asistencia, Reservaciones, Cuentas, Reportes
-- =========================================================

CREATE DATABASE IF NOT EXISTS restaurante_db
  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE restaurante_db;

-- ---------------------------------------------------------
-- Módulo: Seguridad / RBAC
-- ---------------------------------------------------------
CREATE TABLE roles (
  id_rol INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(50) NOT NULL UNIQUE,   -- Admin, Gerente, RRHH, Mesero, Recepcion
  descripcion VARCHAR(255)
);

CREATE TABLE usuarios (
  id_usuario INT AUTO_INCREMENT PRIMARY KEY,
  nombre_usuario VARCHAR(80) NOT NULL UNIQUE,
  correo VARCHAR(150) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  id_rol INT NOT NULL,
  activo BOOLEAN DEFAULT TRUE,
  creado_en DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_rol) REFERENCES roles(id_rol)
);

-- ---------------------------------------------------------
-- Módulo: Empleados
-- ---------------------------------------------------------
CREATE TABLE empleados (
  id_empleado INT AUTO_INCREMENT PRIMARY KEY,
  id_usuario INT UNIQUE,                -- vínculo opcional a cuenta de acceso
  nombre VARCHAR(100) NOT NULL,
  apellido VARCHAR(100) NOT NULL,
  puesto VARCHAR(80) NOT NULL,          -- Cocina, Meseros, Salones, Admin, Limpieza, Mantenimiento
  area VARCHAR(80),
  fecha_ingreso DATE,
  telefono VARCHAR(20),
  estado ENUM('activo','baja') DEFAULT 'activo',
  FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
);

-- ---------------------------------------------------------
-- Módulo: Control de Asistencia
-- ---------------------------------------------------------
CREATE TABLE asistencias (
  id_asistencia INT AUTO_INCREMENT PRIMARY KEY,
  id_empleado INT NOT NULL,
  fecha DATE NOT NULL,
  hora_entrada DATETIME,
  hora_salida DATETIME,
  horas_trabajadas DECIMAL(5,2) GENERATED ALWAYS AS
    (TIMESTAMPDIFF(MINUTE, hora_entrada, hora_salida) / 60.0) STORED,
  observaciones VARCHAR(255),
  FOREIGN KEY (id_empleado) REFERENCES empleados(id_empleado),
  INDEX idx_asistencia_empleado_fecha (id_empleado, fecha)
);

-- ---------------------------------------------------------
-- Módulo: Reservaciones de Salones
-- ---------------------------------------------------------
CREATE TABLE salones (
  id_salon INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(80) NOT NULL,
  capacidad INT NOT NULL,
  ubicacion VARCHAR(120),
  activo BOOLEAN DEFAULT TRUE
);

CREATE TABLE clientes (
  id_cliente INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(150) NOT NULL,
  telefono VARCHAR(20),
  correo VARCHAR(150)
);

CREATE TABLE reservaciones (
  id_reservacion INT AUTO_INCREMENT PRIMARY KEY,
  id_salon INT NOT NULL,
  id_cliente INT NOT NULL,
  fecha_evento DATE NOT NULL,
  hora_inicio TIME NOT NULL,
  hora_fin TIME NOT NULL,
  num_invitados INT,
  estado ENUM('pendiente','confirmada','cancelada','finalizada') DEFAULT 'pendiente',
  creado_en DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_salon) REFERENCES salones(id_salon),
  FOREIGN KEY (id_cliente) REFERENCES clientes(id_cliente),
  INDEX idx_reservacion_salon_fecha (id_salon, fecha_evento)
);

-- ---------------------------------------------------------
-- Módulo: Control de Cuentas de Clientes
-- ---------------------------------------------------------
CREATE TABLE mesas (
  id_mesa INT AUTO_INCREMENT PRIMARY KEY,
  numero VARCHAR(10) NOT NULL,
  area ENUM('restaurante','salon','jardin') NOT NULL,
  id_salon INT NULL,
  FOREIGN KEY (id_salon) REFERENCES salones(id_salon)
);

CREATE TABLE productos (
  id_producto INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(120) NOT NULL,
  categoria VARCHAR(60),
  precio DECIMAL(10,2) NOT NULL
);

CREATE TABLE cuentas (
  id_cuenta INT AUTO_INCREMENT PRIMARY KEY,
  id_mesa INT NOT NULL,
  id_empleado INT NOT NULL,             -- mesero responsable
  estado ENUM('abierta','cerrada') DEFAULT 'abierta',
  subtotal DECIMAL(10,2) DEFAULT 0,
  impuestos DECIMAL(10,2) DEFAULT 0,
  total DECIMAL(10,2) DEFAULT 0,
  abierta_en DATETIME DEFAULT CURRENT_TIMESTAMP,
  cerrada_en DATETIME NULL,
  FOREIGN KEY (id_mesa) REFERENCES mesas(id_mesa),
  FOREIGN KEY (id_empleado) REFERENCES empleados(id_empleado)
);

CREATE TABLE consumos (
  id_consumo INT AUTO_INCREMENT PRIMARY KEY,
  id_cuenta INT NOT NULL,
  id_producto INT NOT NULL,
  cantidad INT NOT NULL DEFAULT 1,
  precio_unitario DECIMAL(10,2) NOT NULL,
  subtotal_linea DECIMAL(10,2) GENERATED ALWAYS AS (cantidad * precio_unitario) STORED,
  registrado_en DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_cuenta) REFERENCES cuentas(id_cuenta),
  FOREIGN KEY (id_producto) REFERENCES productos(id_producto)
);

-- ---------------------------------------------------------
-- Datos base de roles (RBAC)
-- ---------------------------------------------------------
INSERT INTO roles (nombre, descripcion) VALUES
  ('Admin', 'Acceso total al sistema'),
  ('Gerente', 'Supervisión de operación y reportes'),
  ('RRHH', 'Gestión de empleados y asistencia'),
  ('Recepcion', 'Gestión de reservaciones de salones'),
  ('Mesero', 'Gestión de cuentas y consumos');
