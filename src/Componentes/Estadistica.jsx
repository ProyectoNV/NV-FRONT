import { Line } from "react-chartjs-2";
import {
    Chart as Chartjs,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js';

Chartjs.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

var Asistencia = [20,50, 80,10, 40, 90, 60, 70, 10, 90, 50, 30,];
var meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

var midata = {
    labels: meses,
    datasets: [
        {
            label: 'Asistencia',
            data: Asistencia,
            tension: 0.5,
            fill: true,
            borderColor: '#F2F3F4',
            backgroundColor: '#8b0fff ',
            PointRadius: 5,
            pointBorderColor: '#8b0fff',
            pointBackgroundColor: '#fcb900',
        },
    ],
};

var misoptions = {

};

export default function LinesChart() {
    return <Line data={midata} options={misoptions} />
}