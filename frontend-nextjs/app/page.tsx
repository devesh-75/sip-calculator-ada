"use client"

import { useState } from "react"
import SIPChart from "./SIPChart"

export default function Home() {

const [monthly,setMonthly] = useState<number>(5000)
const [rate,setRate] = useState<number>(12)
const [years,setYears] = useState<number>(10)
const [result,setResult] = useState<number | null>(null)

async function calculate(){

const res = await fetch("http://localhost:5000/calculate",{

method:"POST",
headers:{ "Content-Type":"application/json" },

body: JSON.stringify({
monthly,
rate,
years
})

})

const data = await res.json()

setResult(data.futureValue)

}

const invested = monthly * years * 12
const returns = result ? result - invested : 0
function formatCurrency(num:number){

return new Intl.NumberFormat("en-IN",{
style:"currency",
currency:"INR",
maximumFractionDigits:0
}).format(num)

}
return(

<div className="min-h-screen bg-gray-50 flex justify-center items-start py-12">

<div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-3xl">

<h1 className="text-3xl font-bold text-[#224c87]">
SIP Investment Calculator
</h1>

<p className="text-gray-600 mt-2">
Estimate the potential future value of your monthly investments.
</p>

<hr className="my-6"/>

<div className="space-y-6">

<div>
<label className="font-medium">
Monthly Investment: ₹ {monthly}
</label>

<input
type="range"
min="500"
max="50000"
step="500"
value={monthly}
onChange={(e)=>setMonthly(Number(e.target.value))}
className="w-full mt-2"
/>
</div>

<div>
<label className="font-medium">
Expected Annual Return: {rate}%
</label>

<input
type="range"
min="1"
max="20"
step="0.5"
value={rate}
onChange={(e)=>setRate(Number(e.target.value))}
className="w-full mt-2"
/>
</div>

<div>
<label className="font-medium">
Investment Duration: {years} years
</label>

<input
type="range"
min="1"
max="40"
step="1"
value={years}
onChange={(e)=>setYears(Number(e.target.value))}
className="w-full mt-2"
/>
</div>

<button
onClick={calculate}
className="bg-[#224c87] text-white px-6 py-3 rounded-lg hover:bg-blue-900 transition"
>
Calculate
</button>

</div>

{result !== null && (

<div className="mt-10">

<h2 className="text-xl font-semibold mb-4">
Investment Results
</h2>

<div className="grid grid-cols-1 md:grid-cols-3 gap-4">

<div className="bg-gray-100 p-4 rounded-lg">
<p className="text-gray-600">Total Invested</p>
<p className="text-lg font-semibold">
₹ {invested}
</p>
</div>

<div className="bg-gray-100 p-4 rounded-lg">
<p className="text-gray-600">Returns Earned</p>
<p className="text-lg font-semibold text-[#da3832]">
₹ {returns.toFixed(2)}
</p>
</div>

<div className="bg-gray-100 p-4 rounded-lg">
<p className="text-gray-600">Future Value</p>
<p className="text-lg font-semibold text-[#224c87]">
₹ {result.toFixed(2)}
</p>
</div>

</div>

<div className="mt-8 flex justify-center">
<div className="w-72">
<SIPChart invested={invested} returns={returns}/>
</div>
</div>

</div>

)}

<hr className="my-10"/>

<p className="text-xs text-gray-500 leading-relaxed">
This tool has been designed for information purposes only.
Actual results may vary beacuse of various factors in market.
Investor should not consider above as a recommendation for any schemes. 
Past performance may not be sustained in future and
is not a guarantee of any future returns.
</p>

</div>

</div>

)
}