import { useState } from "react";
import { Form, Input, InputNumber, Button, message, Card, Typography, Divider, Layout, DatePicker } from "antd";
import axios from "axios";
import AppHeader from "../layout/LayoutHeader";
import AppFooter from "../layout/LayoutFooter";

const { Title } = Typography;
const { Content } = Layout;

function AdminPanel() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const user = JSON.parse(localStorage.getItem("user"));
  const username = user?.nombre || "";

  const successAddDevice = () => {
    messageApi.open({
      type: "success",
      content: "Producto agregado exitosamente!",
    });
  };

  const handleAddDevice = async (values) => {
    setLoading(true);
    try {
      const payload = {
        ...values,
        fecha_lanzamiento: values.fecha_lanzamiento
          ? values.fecha_lanzamiento.format("YYYY-MM-DD")
          : null,
      };

      const response = await axios.post("http://localhost:4000/api/devices", payload, {
        headers: { "Content-Type": "application/json" },
      });

      console.log("Respuesta:", response.data);
      successAddDevice();
      form.resetFields();
    } catch (error) {
      console.error("Error al crear dispositivo:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <AppHeader username={username} />
      <Content style={{ padding: "30px 50px", display: "flex", justifyContent: "center" }}>
        <div style={{ width: "100%", maxWidth: 700 }}>
          {contextHolder}
          <Card
            style={{
              boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
              borderRadius: 16,
              padding: "30px 20px",
            }}
          >
            <Title level={2} style={{ textAlign: "center", marginBottom: 20 }}>
              Panel de Administración
            </Title>
            <Divider />
            <Form
              form={form}
              layout="vertical"
              onFinish={handleAddDevice}
              style={{ marginTop: 10 }}
            >
              <Form.Item
                name="nombre"
                label="Nombre"
                rules={[{ required: true, message: "Por favor ingresa el nombre" }]}
              >
                <Input placeholder="Ej: Laptop HP" />
              </Form.Item>

              <Form.Item
                name="marca"
                label="Marca"
                rules={[{ required: true, message: "Por favor ingresa la marca" }]}
              >
                <Input placeholder="Ej: HP" />
              </Form.Item>

              <Form.Item
                name="tipo"
                label="Tipo"
                rules={[{ required: true, message: "Por favor ingresa el tipo" }]}
              >
                <Input placeholder="Ej: Portátil" />
              </Form.Item>

              <Form.Item
                name="precio"
                label="Precio"
                rules={[{ required: true, message: "Por favor ingresa el precio" }]}
              >
                <InputNumber
                  style={{ width: "100%" }}
                  placeholder="Ej: 1500"
                  min={0}
                  formatter={(value) => `$ ${value}`}
                  parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                />
              </Form.Item>

              <Form.Item
                name="imagen"
                label="URL de Imagen"
                rules={[{ required: true, message: "Por favor ingresa la URL de la imagen" }]}
              >
                <Input placeholder="Ej: https://link-a-imagen.com/imagen.jpg" />
              </Form.Item>

              <Form.Item
                name="fecha_lanzamiento"
                label="Fecha de lanzamiento"
                rules={[{ required: true, message: "Por favor selecciona la fecha de lanzamiento" }]}
              >
                <DatePicker style={{ width: "100%" }}
                  placeholder="Selecciona la fecha" />
              </Form.Item>

              <Form.Item name="descripcion" label="Descripción">
                <Input.TextArea rows={3} placeholder="Descripción breve del producto" />
              </Form.Item>

              <Form.Item style={{ textAlign: "center", marginTop: 20 }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  loading={loading}
                  style={{ padding: "10px 0", fontSize: 16, borderRadius: 8 }}
                >
                  Agregar Producto
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </div>
      </Content>
      <AppFooter />
    </Layout>
  );
}

export default AdminPanel;
