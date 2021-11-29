

import { options1, options2 } from './utils/ChartOptions';
import { Card, Spinner } from 'react-bootstrap';
import { useState, useEffect } from 'react';

/* Se importan los elementos de Chart.js que se mostrarán en el gráfico */
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
/*Se importa el componente para poder usarlo en JSX*/
import { Bar } from 'react-chartjs-2';

//Registra los elementos que se utilizaran en el gráfico de barras.
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function App() {
  //Variable para inicializar los graficos "vacios"
  const initialData = {
    labels: ["","","","",""],
    datasets: [
      {
        label: "Precio (USD)",
        data: [0,0,0,0,0],
        backgroundColor: [
          "#ffbb11",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0"
        ]
      }
    ]
  }
  const [ datosChart, setDatosChart ] = useState(initialData);
  const [ mostrarLoading, setMostrarCargando ] = useState(true);
  

  useEffect(() => {
    //Creamos la función que realiza la petición al API.
    const fetchPrices = async () => {
      const res = await fetch("https://api.coincap.io/v2/assets/?limit=5")
      const resBody = await res.json();
      
      /*Actualizamos el estado datosChart con la estructura que necesita el 
      componente Bar para poder cargar la gráfica.*/
      setDatosChart({
          labels: resBody.data.map((crypto) => crypto.name),
          datasets: [
            {
              label: "Precio (USD)",
              data: resBody.data.map((crypto) => crypto.priceUsd),
              backgroundColor: [
                "#ffbb11",
                "#ecf0f1",
                "#50AF95",
                "#f3ba2f",
                "#2a71d0"
              ]
            }
          ]
        });
        setMostrarCargando(false); //Ocultamos el loading...
            
    }
    setMostrarCargando(true); //Mostramos el loading...
    fetchPrices();
  },[]);

  return (
    <div className="container-fluid">
      <Card>
        <Card.Body>
          <Card.Title>
            <h1>Ejemplos de Chart en React</h1>
          </Card.Title>
          <Card.Text>
            La librería usada para trabajar es: <a href="https://www.npmjs.com/package/react-chartjs-2">react-chartjs-2</a> para instalar se necesita:
            npm install --save react-chartjs-2 chart.js
            Para mayor información:<br/>
            <a href="https://react-chartjs-2.netlify.app/components">https://react-chartjs-2.netlify.app/components</a><br/>
            <a href="https://react-chartjs-2.netlify.app/components/bar">https://react-chartjs-2.netlify.app/components/bar</a><br/>
            <a href="https://react-chartjs-2.netlify.app/examples/">https://react-chartjs-2.netlify.app/examples/</a>
          </Card.Text>
        </Card.Body>
      </Card>
      <Card className="mt-5">
        <Card.Body>
          <div class="row">
            <div className="col-sm-6 text-center">
              {/* 
                options1 y options2 son objetos que sirven para configurar el 
                aspectos del gráfico ver utils/ChartOptions.js  

                Cada tipo de gráfico tiene distintas opciones que configurar, para mayor información revisar en:
                https://react-chartjs-2.netlify.app/components
                https://react-chartjs-2.netlify.app/examples/
                
              }*/}
              {mostrarLoading ? <Spinner animation="border" variant="primary" /> : <Bar options={options1} data={datosChart} />}
            </div>
            <div className="col-sm-6 text-center">
              {mostrarLoading ? <Spinner animation="border" variant="primary" /> : <Bar options={options2} data={datosChart} />}
            </div>
          </div>
          
        </Card.Body>
      </Card>      
    </div>
  );
}

export default App;
