import { useState } from "react";
import { Card, Form, Input, Button, Typography, message } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const { Title } = Typography;

function AuthForm() {
  const [isRegister, setIsRegister] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = (values) => {
    setLoading(true);

    setTimeout(async () => {
      const payload = isRegister
        ? {
          nombre: values.nombre,
          apellido: values.apellido,
          correo_electronico: values.correo_electronico,
          password: values.password,
        }
        : {
          correo_electronico: values.correo_electronico,
          password: values.password,
        };

      const endpoint = isRegister
        ? "http://localhost:4000/api/usuarios"
        : "http://localhost:4000/api/usuarios/login";

      try {
        const { data } = await axios.post(endpoint, payload, {
          headers: { "Content-Type": "application/json" },
        });

        if (isRegister) {
          setIsRegister(false);
          message.success("Registro exitoso. Ahora puedes iniciar sesión");
        } else {
          const usuarioAGuardar = data.usuario || data;
          localStorage.setItem("user", JSON.stringify(usuarioAGuardar));
          navigate("/home");
        }
      } catch (err) {
        console.error("Error en la petición:", err);
      } finally {
        setLoading(false);
      }
    }, 1500);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#e6f0ff",
        padding: "20px",
      }}
    >
      <Card
        style={{
          width: "100%",
          maxWidth: 400,
          borderRadius: 16,
          padding: "30px 20px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
          backgroundColor: "#ffffff",
        }}
      >
        <Title
          level={2}
          style={{
            textAlign: "center",
            marginBottom: 30,
            color: "#001529",
          }}
        >
          {isRegister ? "Registro" : "Iniciar sesión"}
        </Title>

        <Form layout="vertical" onFinish={onFinish}>
          {isRegister && (
            <>
              <Form.Item
                label="Nombre"
                name="nombre"
                rules={[{ required: true, message: "Ingresa tu nombre" }]}
              >
                <Input placeholder="Ej: Juan" />
              </Form.Item>
              <Form.Item
                label="Apellido"
                name="apellido"
                rules={[{ required: true, message: "Ingresa tu apellido" }]}
              >
                <Input placeholder="Ej: Pérez" />
              </Form.Item>
            </>
          )}

          <Form.Item
            label="Correo electrónico"
            name="correo_electronico"
            rules={[
              { required: true, message: "Por favor ingresa tu correo" },
              { type: "email", message: "Correo no válido" },
            ]}
          >
            <Input placeholder="ejemplo@correo.com" />
          </Form.Item>

          <Form.Item
            label="Contraseña"
            name="password"
            rules={[{ required: true, message: "Por favor ingresa tu contraseña" }]}
          >
            <Input.Password placeholder="********" />
          </Form.Item>

          <Form.Item style={{ marginTop: 20 }}>
            <Button
              type="primary"
              htmlType="submit"
              block
              loading={loading}
              style={{
                padding: "10px 0",
                fontSize: 16,
                borderRadius: 8,
              }}
            >
              {isRegister ? "Registrarse" : "Ingresar"}
            </Button>
          </Form.Item>
        </Form>

        <Button
          type="link"
          block
          onClick={() => setIsRegister(!isRegister)}
          style={{
            marginTop: 10,
            textAlign: "center",
            fontWeight: "bold",
            color: "#001529",
          }}
        >
          {isRegister
            ? "¿Ya tienes cuenta? Inicia sesión"
            : "¿No tienes cuenta? Regístrate"}
        </Button>
      </Card>
    </div>
  );
}

export default AuthForm;
