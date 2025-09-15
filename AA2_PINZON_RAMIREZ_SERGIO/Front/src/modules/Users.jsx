import { useState, useEffect } from "react";
import { Table, Card, Typography, Divider, message, Layout, Button, Popconfirm } from "antd";
import axios from "axios";
import AppHeader from "../layout/LayoutHeader";
import AppFooter from "../layout/LayoutFooter";

const { Title } = Typography;
const { Content } = Layout;

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));
  const username = user?.nombre || "";

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get("http://localhost:4000/api/usuarios");
        setUsers(data);
      } catch (err) {
        message.error("Error al cargar los usuarios");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleDeleteUser = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`http://localhost:4000/api/usuarios/${id}`);
      message.success("Usuario eliminado correctamente");
      setUsers(users.filter((user) => user.id !== id));
    } catch (err) {
      message.error("Error al eliminar el usuario");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Nombre", dataIndex: "nombre", key: "nombre" },
    { title: "Apellido", dataIndex: "apellido", key: "apellido" },
    { title: "Correo Electrónico", dataIndex: "correo_electronico", key: "correo_electronico" },
    {
      title: "Fecha de Creación",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => new Date(text).toLocaleString()
    },
    {
      title: "Acciones",
      key: "acciones",
      render: (_, record) => {
        if (record.id === user?.id) {
          return <span style={{ color: "#888" }}>No permitido</span>;
        }
        return (
          <Popconfirm
            title={`¿Estás seguro de eliminar al usuario "${record.nombre} ${record.apellido}"?`}
            onConfirm={() => handleDeleteUser(record.id)}
            okText="Sí"
            cancelText="No"
          >
            <Button type="primary" danger>
              Eliminar
            </Button>
          </Popconfirm>
        );
      },
    }
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <AppHeader username={username} />
      <Content style={{ padding: "30px 50px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <Card
            bordered
            style={{
              boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
              borderRadius: 16,
              padding: "30px 20px",
            }}
          >
            <Title level={2} style={{ textAlign: "center", marginBottom: 20 }}>
              Gestión de Usuarios
            </Title>
            <Divider />
            <Table
              dataSource={users}
              columns={columns}
              loading={loading}
              rowKey={(record) => record.id}
              pagination={{ pageSize: 10 }}
            />
          </Card>
        </div>
      </Content>
      <AppFooter />
    </Layout>
  );
}

export default UserManagement;
