"use client"

import { Pie } from "react-chartjs-2"
import {
Chart as ChartJS,
ArcElement,
Tooltip,
Legend
} from "chart.js"

ChartJS.register(ArcElement, Tooltip, Legend)

export default function SIPChart({ invested, returns }: any) {

const data = {
labels: ["Invested Amount", "Returns"],
datasets: [
{
data: [invested, returns],
backgroundColor: ["#224c87", "#da3832"]
}
]
}

return <Pie data={data} options={{animation:{duration:1200}}}/>
}