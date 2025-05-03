import React from 'react'

export default function Cancel() {
    return (
        <>
            <div className="card mt-50 mb-50" style={{ margin: "auto", width: "80vh", borderRadius: "20px", marginTop: "20px", backgroundColor: "#a3cb8c" }}>
                <div className="col d-flex "><span className="text-muted" id="orderno">order #546924</span></div>
                <div className="gap">
                    <div className="col-2 d-flex mx-auto"> </div>
                </div>
                <div className="title1 mx-auto"> Payment Failed!  </div>
                <div className="main1"> <span id="sub-title1">
                    <p><b>Payment Summary</b></p>
                </span>
                    {/* <div className="row row-main1">
            <div className="col-3"> <img className="img-fluid" src="https://i.imgur.com/qSnCFIS.png"/> </div>
            <div className="col-6">
                <div className="row d-flex">
                    <p><b>iPhone XR</b></p>
                </div>
                <div className="row d-flex">
                    <p className="text-muted">128GB White</p>
                </div>
            </div>
            <div className="col-3 d-flex justify-content-end">
                <p><b>$599</b></p>
            </div>
        </div> */}
                    <hr />
                    <div className="total1">
                        {/* <div className="row">
                <div className="col"> <b> Total:</b> </div>
                <div className="col d-flex justify-content-end"> <b>$847.95</b> </div>
            </div> */}
                        <a href='/'><button type="button" className="button d-flex mx-auto mb-4"> Try again </button></a>
                    </div>
                </div>
            </div>
        </>
    )
}
