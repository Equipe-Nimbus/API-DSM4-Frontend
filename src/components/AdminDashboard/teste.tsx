import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function Teste() {
    const [options, setOptions] = useState<ApexOptions>({});
    const [series, setSeries] = useState<Array<{ name: string, data: { x: number, y: number }[] }>>([]);

    useEffect(() => {
        const startOfDay = new Date(2021, 10, 10).setHours(0, 0, 0, 0);
        const endOfDay = new Date(2021, 10, 10).setHours(23, 59, 59, 999);

        setOptions({
            xaxis: {
                type: 'datetime',
                tickAmount: 24,
                min: startOfDay,
                max: endOfDay,
                labels: {
                    formatter: function(value) {
                        return new Date(value).getHours().toString();
                    }
                }
            }
        })

        setSeries([
            {
                name: 'series1',
                data: [
                    {
                        y: 25,
                        x: new Date(2021, 10, 10, 1).getTime() // 1:00
                    },
                    {
                        y: 27,
                        x: new Date(2021, 10, 10, 5).getTime() // 5:00
                    },
                    {
                        y: 29,
                        x: new Date(2021, 10, 10, 9).getTime() // 9:00
                    },
                    {
                        y: 30,
                        x: new Date(2021, 10, 10, 13).getTime() // 13:00
                    },
                    {
                        y: 28,
                        x: new Date(2021, 10, 10, 17).getTime() // 17:00
                    },
                    {
                        y: 26,
                        x: new Date(2021, 10, 10, 21).getTime() // 21:00
                    }
                ]
            }
        ])
    }, [])

    return (
        <>
        <Chart 
            height={300} 
            width={"100%"} 
            type="line"
            options={options}
            series={series}
            />
        </>
    )
}

const medicoes = [{ //array de objetos
    valor: 25, //Number pro eixo y
    data: new Date(2021, 10, 10, 1) //Datetime (vou extrair a hora para o eixo x do gráfico)
}]