import React, { useState, useEffect } from "react";
import {
  Flex,
  Button,
  Input,
  Text,
  Stack,
  Image,
  useToast,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";

import { MdMusicNote, MdOutlineMusicOff } from "react-icons/md";
function App() {
  const [regalos, setRegalos] = useState([]);
  const [nombreRegalo, setNombreRegalo] = useState("");
  const [urlRegalo, setUrlRegalo] = useState("");
  const [cantidadRegalo, setCantidadRegalo] = useState(0);
  const [nombreDelRegalo, setNombreDelRegalo] = useState("");
  const [precio, setPrecio] = useState("");
  const [id, setId] = useState("");
  const [musica, setMusica] = useState("");
  const [pausa, setPausa] = useState(true);
  const regalitos = [
    "Medias",
    "Pc",
    "Juegos",
    "Viajes",
    "Escritorio",
    "Nintendo Switch",
  ];

  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  function manejarRegalo() {
    if (nombreRegalo === "" || urlRegalo === "" || cantidadRegalo === "") {
      toast({
        title: "Complete los campos vacíos!!!.",

        status: "warning",
        duration: 9000,
        isClosable: true,
      });
    } else {
      if (!id) {
        setRegalos((regalos) =>
          regalos.concat({
            nombre: nombreRegalo,
            url: urlRegalo,
            cantidad: cantidadRegalo,
            destinatario: nombreDelRegalo,
            precio: precio,
            id: +new Date(),
          })
        );
      } else {
        setRegalos((regalos) =>
          regalos.map((regalo) =>
            regalo.id === id
              ? {
                  nombre: nombreRegalo,
                  url: urlRegalo,
                  cantidad: cantidadRegalo,
                  id,
                  destinatario: nombreDelRegalo,
                  precio: precio,
                }
              : regalo
          )
        );
      }
      onOpen(null);
      setNombreRegalo("");
      setUrlRegalo("");
      setCantidadRegalo(0);
      setNombreDelRegalo("");
      setPrecio("");
      setId("");
    }
  }

  function editarRegalo(regalo) {
    onOpen();
    setNombreRegalo(regalo.nombre);
    setNombreDelRegalo(regalo.destinatario);
    setUrlRegalo(regalo.url);
    setCantidadRegalo(regalo.cantidad);
    setPrecio(regalo.precio);
    setId(regalo.id);
  }

  function borrarRegalo(id) {
    const regaloFiltrado = regalos.filter((regalo) => regalo.id != id);
    setRegalos(regaloFiltrado);
  }

  function regaloRandom() {
    const index = Math.floor(Math.random() * regalitos.length);
    setNombreRegalo(regalitos[index]);
  }

  function total() {
    const reducir = (acum, current) => {
      return acum + current.cantidad * current.precio;
    };
    const sum = regalos.reduce(reducir, 0);
    return sum;
  }

  function manejarMusica() {
    if (pausa) {
      musica.play();
      setPausa((pausa) => !pausa);
    } else {
      musica.pause();
      setPausa((pausa) => !pausa);
    }
  }

  function borrarTodo() {
    setRegalos([]);
  }

  useEffect(() => {
    const urlMusic = "https://andresguanov.github.io/assets/christmas.mp3";
    const music = new Audio(urlMusic);
    music.volume = 0.05;
    music.loop = true;
    setMusica(music);
  }, []);
  return (
    <Flex
      h="100vh"
      maxw="100vw"
      alignItems="center"
      justifyContent="center"
      backgroundColor="#ca4949"
      backgroundPosition="center"
    >
      <Flex
        h="auto"
        maxw="40vw"
        direction="column"
        background="gray.100"
        opacity="90%"
        p={2}
        rounded={6}
      >
        <Stack p={3}>
          <Flex justifyContent="space-around">
            <Button onClick={onOpen} colorScheme="green">
              Añadir Regalos
            </Button>
            <Button onClick={manejarMusica}>
              {pausa ? (
                <MdOutlineMusicOff color="red" />
              ) : (
                <MdMusicNote color="green" />
              )}
            </Button>
          </Flex>
        </Stack>
        <Stack p={4}>
          {regalos.length < 1 && (
            <Text color="red">Agrega regalos a tus lista por favor !!!</Text>
          )}
        </Stack>
        {regalos.map((regalo) => {
          return (
            <Stack direction="row" spacing={2} p={2}>
              <Image w="50px" h="50px" src={`${regalo.url}`} />
              <Stack direction="column" spacing={-2} alignContent="center">
                <Text>{regalo.nombre}</Text>
                <Text color="grey">{regalo.destinatario}</Text>
              </Stack>
              <Text>x{regalo.cantidad}</Text>
              <Text>${regalo.precio}</Text>
              <Button colorScheme="yellow" onClick={() => editarRegalo(regalo)}>
                Editar
              </Button>
              <Button colorScheme="red" onClick={() => borrarRegalo(regalo.id)}>
                X
              </Button>
            </Stack>
          );
        })}
        <Stack pt={5}>
          <Text bg="blackAlpha.300" textAlign="center">
            Total${total()}
          </Text>
          <Button onClick={borrarTodo} colorScheme="red">
            Borrar Todo
          </Button>
        </Stack>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Regalos:</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Stack>
                <Stack direction="row">
                  <Input
                    placeholder="Nombre del regalo"
                    value={nombreRegalo}
                    onChange={(event) => setNombreRegalo(event.target.value)}
                  ></Input>
                  <Button p={5} colorScheme="yellow" onClick={regaloRandom}>
                    Sorprendeme
                  </Button>
                </Stack>
                <Input
                  placeholder="Imagen del regalo"
                  value={urlRegalo}
                  onChange={(event) => setUrlRegalo(event.target.value)}
                ></Input>
                <Input
                  placeholder="Para quien es el regalo"
                  value={nombreDelRegalo}
                  onChange={(event) => setNombreDelRegalo(event.target.value)}
                ></Input>
                <NumberInput
                  value={cantidadRegalo}
                  onChange={(valueString) =>
                    setCantidadRegalo(Number(valueString))
                  }
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
                <Input
                  placeholder="Precio($)"
                  value={precio}
                  onChange={(event) => setPrecio(event.target.value)}
                ></Input>
                <Stack direction="row">
                  <Button size="sm" colorScheme="green" onClick={manejarRegalo}>
                    Agregar
                  </Button>
                </Stack>
              </Stack>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="red" mr={3} onClick={onClose}>
                Cerrar
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Flex>
    </Flex>
  );
}

export default App;
