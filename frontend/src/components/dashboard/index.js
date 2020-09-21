import React, { useEffect, useState } from 'react';
import socketIoClient from 'socket.io-client';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';


function DashBoard() {
    const [totalGruposServicos, setTotalGruposServicos] = useState(0);
    const [options, setOptions] = useState({
        title: { text: 'My chart' },
        chart: { type: 'column' },
        series: [{ data: [1, 2, totalGruposServicos] }]
    });

    useEffect(() => {
        const socket = socketIoClient('http://localhost:3333');
        socket.on('dashboard', data => {
            if (data.totalGruposServicos) {
                setTotalGruposServicos(data.totalGruposServicos);
                setOptions({
                    title: { text: 'My chart' },
                    chart: { type: 'column' },
                    series: [{ data: [1, 2, data.totalGruposServicos] }]
                });
            }
        });
    }, []);

    return (
        <>
            <div>Total de Grupos de Serviços <strong>{totalGruposServicos}</strong></div>
            <HighchartsReact
                immutable={false}
                updateArgs={[true, true, true]}
                highcharts={Highcharts} options={options} />
        </>
    );
}

export default DashBoard;