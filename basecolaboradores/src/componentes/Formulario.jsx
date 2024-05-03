import React from 'react';
import { useState, useEffect } from 'react';

export default function Formulario({ addAlert, setData, data, setDataFilter, dataFilter }) {
  const [datosColaborador, setDatosColaborador] = useState({
    nombre: '',
    correo: '',
    edad: '',
    cargo: '',
    telefono: '',
  });

  function handlerInputs(e) {
    if (e.target.id === 'inputNombre') {
      setDatosColaborador({ ...datosColaborador, nombre: e.target.value });
    }

    if (e.target.id === 'inputEmail') {
      setDatosColaborador({ ...datosColaborador, correo: e.target.value });
    }

    if (e.target.id === 'inputEdad') {
      setDatosColaborador({ ...datosColaborador, edad: e.target.value });
    }
    if (e.target.id === 'inputCargo') {
      setDatosColaborador({ ...datosColaborador, cargo: e.target.value });
    }
    if (e.target.id === 'inputTelefono') {
      setDatosColaborador({ ...datosColaborador, telefono: e.target.value });
    }
  }

  function validandoDatos(e) {
    e.preventDefault();

    const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const regexTelef = /^[0-9]{9}$/;

    if (
      datosColaborador.nombre.trim() === '' ||
      datosColaborador.correo === '' ||
      datosColaborador.edad === '' ||
      datosColaborador.cargo.trim() === '' ||
      datosColaborador.telefono === ''
    ) {
      addAlert({
        texto: 'Debes completar todos los campos',
        tipo: 'alert-danger',
        estado: true,
      });
    } else if (!regexEmail.test(datosColaborador.correo)) {
      addAlert({
        texto: 'Correo electrónico no válido',
        tipo: 'alert-danger',
        estado: true,
      });
    } else if (!regexTelef.test(datosColaborador.telefono)) {
      addAlert({
        texto: 'El teléfono debe tener 9 dígitos',
        tipo: 'alert-danger',
        estado: true,
      });
    } else {
      addAlert({
        texto: 'Colaborador Agregado',
        tipo: 'alert-success',
        estado: true,
      });

      const newId = data.length
        ? (parseInt(data[data.length - 1].id) + 1).toString()
        : '0';

      setData([...data, { ...datosColaborador, id: newId }]);
      setDataFilter([...dataFilter, { ...datosColaborador, id: newId }]);

      setDatosColaborador({
        nombre: '',
        correo: '',
        edad: '',
        cargo: '',
        telefono: '',
      });
    }
  }

  useEffect(() => {
    setDatosColaborador({
      nombre: '',
      correo: '',
      edad: '',
      cargo: '',
      telefono: '',
    });
  }, [data]);

  return (
    <div className="formulario col-12 col-lg-4">
      <h3>Agregar Colaborador</h3>

      <form noValidate onSubmit={(e) => validandoDatos(e)}>
        <div className="mb-3">
          <input
            onChange={(e) => handlerInputs(e)}
            value={datosColaborador.nombre}
            type="text"
            className="form-control"
            id="inputNombre"
            placeholder="Nombre del colaborador"
          />
        </div>

        <div className="mb-3">
          <input
            onChange={(e) => handlerInputs(e)}
            value={datosColaborador.correo}
            type="email"
            className="form-control"
            id="inputEmail"
            placeholder="Email del colaborador"
            pattern=".*"
          />
        </div>

        <div className="mb-3">
          <input
            onChange={(e) => handlerInputs(e)}
            value={datosColaborador.edad}
            type="number"
            className="form-control"
            id="inputEdad"
            placeholder="Edad del colaborador"
          />
        </div>

        <div className="mb-3">
          <input
            onChange={(e) => handlerInputs(e)}
            value={datosColaborador.cargo}
            type="text"
            className="form-control"
            id="inputCargo"
            placeholder="Cargo del colaborador"
          />
        </div>

        <div className="mb-3">
          <input
            onChange={(e) => handlerInputs(e)}
            value={datosColaborador.telefono}
            type="text"
            className="form-control"
            id="inputTelefono"
            placeholder="Teléfono del colaborador"
          />
        </div>

        <div className="d-grid mb-3">
          <button type="submit" className="btn">
            Agregar Colaborador
          </button>
        </div>
      </form>
    </div>
  );
}
