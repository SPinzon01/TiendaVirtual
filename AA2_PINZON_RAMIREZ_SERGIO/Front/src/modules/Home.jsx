
import { useState, useEffect } from "react";
import { Modal, Card, Tag, Divider, Button, Typography, Input, List, Layout, message } from "antd";
import axios from "axios";
import DeviceList from "../components/DeviceList";
import AppHeader from "../layout/LayoutHeader";
import AppFooter from "../layout/LayoutFooter";

const { Title } = Typography;
const { TextArea } = Input;
const { Content } = Layout;

function Home() {
  const [devices, setDevices] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [comentario, setComentario] = useState("");
  const [comments, setComments] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));
  const username = user?.nombre || "";

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/devices");
        const apiDevices = Array.isArray(response.data)
          ? response.data
          : response.data.devices || [];
        const mergedDevices = [...apiDevices];
        setDevices(mergedDevices);
      } catch (error) {
        console.error("Error cargando dispositivos:", error.response || error);
      }
    };

    fetchDevices();
  }, []);

  const handleSelectDevice = async (device) => {
    setSelectedDevice(device);
    setIsModalOpen(true);

    try {
      const response = await axios.get(`http://localhost:4000/api/comentarios/${device.id}`);
      setComments(response.data || []);
    } catch (error) {
      console.error("Error cargando comentarios:", error.response || error);
      setComments([]);
    }
  };

  const handleAddComment = async () => {
    if (!comentario.trim() || !selectedDevice) return;

    try {
      const payload = {
        id_usuario: user.id,
        id_dispositivo: selectedDevice.id,
        texto: comentario
      };

      await axios.post(`http://localhost:4000/api/comentarios`, payload);

      const response = await axios.get(`http://localhost:4000/api/comentarios/${selectedDevice.id}`);
      setComments(response.data || []);
      setComentario("");
      message.success("Comentario agregado correctamente!");
    } catch (error) {
      console.error("Error agregando comentario:", error.response || error);
      message.error("No se pudo agregar el comentario");
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <AppHeader username={username} />
      <Content style={{ padding: "20px 50px" }}>
        <h1 style={{ marginBottom: 30 }}>Catálogo de Dispositivos</h1>

        {devices.length === 0 ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "50vh",
              fontSize: 18,
              fontWeight: "bold",
              color: "#555",
            }}
          >
            No hay productos disponibles. Por favor, agrega productos.
          </div>
        ) : (
          <DeviceList devices={devices} onSelectDevice={handleSelectDevice} />
        )}
        <Modal
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          footer={null}
          centered
          width={"80%"}
          style={{ overflowY: "auto" }}
        >
          {selectedDevice && (
            <Card>
              <div style={{ display: "flex", gap: "20px" }}>
                <div style={{ flex: "1", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <img
                    alt={selectedDevice.nombre}
                    src={selectedDevice.imagen}
                    style={{ maxHeight: "400px", objectFit: "contain" }}
                  />
                </div>
                <div style={{ display: "flex", flexDirection: "column", flex: "1" }}>
                  <Title level={1}>{selectedDevice.nombre}</Title>
                  <Divider />
                  <Title level={4}>Marca: {selectedDevice.marca}</Title>
                  <Title level={4}>Tipo: {selectedDevice.tipo}</Title>
                  <Title level={4}>Fecha de lanzamiento: {selectedDevice.fecha_lanzamiento}</Title>
                  <Title level={4}>
                    Precio:{" "}
                    <Tag color="green" style={{ fontSize: "14px", padding: "4px 10px" }}>
                      ${selectedDevice.precio}
                    </Tag>
                  </Title>
                  <Divider />
                  <Title level={5}>Descripción:</Title>
                  <p>{selectedDevice.descripcion}</p>
                  <Button type="primary" style={{ alignSelf: "end" }}>
                    Comprar ahora
                  </Button>
                </div>
              </div>
              <Divider />
              <div style={{ display: "flex", flexDirection: "column", flex: "1" }}>
                <Title level={2}>Agrega un comentario</Title>
                <TextArea
                  rows={3}
                  placeholder="Escribe un comentario..."
                  value={comentario}
                  onChange={(e) => setComentario(e.target.value)}
                />
                <Button
                  type="primary"
                  onClick={handleAddComment}
                  style={{ marginTop: 10 }}
                  disabled={!comentario.trim()}
                >
                  Agregar comentario
                </Button>
                <Divider />
                <Title level={2}>Comentarios</Title>
                <List
                  style={{ marginTop: 20 }}
                  bordered
                  dataSource={comments}
                  renderItem={(item, index) => (
                    <List.Item key={index}>
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <strong>{item.user.nombre}</strong>
                        <span>{item.texto}</span>
                        <small style={{ color: "gray" }}>{new Date(item.createdAt || item.fecha).toLocaleString("es-CO")}</small>
                      </div>
                    </List.Item>
                  )}
                />
              </div>
            </Card>
          )}
        </Modal>
      </Content>
      <AppFooter />
    </Layout>
  );
}

export default Home;
