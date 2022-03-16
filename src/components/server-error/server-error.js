import './server-error.css'
import React from 'react';

function ServerError() {
    return (
        <section className='server-error'>
            <p className='server-error__text'>
            Во время запроса произошла ошибка. 
            Возможно, проблема с соединением или сервер недоступен. 
            Подождите немного и попробуйте ещё раз.
           </p>
        </section>

    )
}

export default ServerError;