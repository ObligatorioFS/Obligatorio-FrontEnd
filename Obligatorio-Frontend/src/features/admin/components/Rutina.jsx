/*import { useDispatch } from "react-redux"
import MensajeAlerta from "../../shared/components/MensajeAlerta"
import { useEffect, useRef, useState } from "react"
import { actualizarActividad, eliminarActividad } from "../../actividadesSlice"
import { useNavigate } from "react-router"

const Rutina = ({rutina}) => {
    

    if (!editando) {
    return (
      <div class="rutina-card">

  <h2 class="rutina-objetivo">
    Ganar masa muscular
  </h2>

  <p class="rutina-info">
    <strong>Actividad:</strong> Gimnasio
  </p>

  <p class="rutina-info">
    <strong>Para:</strong> usuario@email.com
  </p>

  <button class="rutina-btn">
    Ver ejercicios
  </button>

</div>
    )
  } else {
    return (
      <div className="quick-item">
        <div>
          <input ref={inputNombreRef} defaultValue={actividad.nombre} />
          <textarea ref={inputDescripcionRef} defaultValue={actividad.descripcion} />
          <MensajeAlerta mensaje={mensaje} />
        </div>
        <button onClick={handleOnClickGuardarEdicion} className="table-btn save-btn">Guardar</button>
      </div>
    )
  }


} */