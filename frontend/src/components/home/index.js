import React from 'react';

export default function Home() {

    return (
        <React.Suspense fallback={<div>Carregando Home</div>}>
            <h2>Home</h2>
        </React.Suspense>
    );
}

