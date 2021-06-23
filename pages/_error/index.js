import React from 'react';

export function ErrorPage({ statusCode }) {
    return (
        <React.Fragment>
           <div>錯誤代碼，請連絡系統管理員。</div>
        </React.Fragment>
    );
}

export default ErrorPage;