import "./detail.css"
const Detail = () => {
    return (
        <div className='detail'>
            <div className="user">
                <img src="/avatar.png" alt=""/>
                <h2>Dương Trí Nguyên</h2>
                <p>Name's Yinlin.</p>
            </div>
            <div className="info">
                <div className="option">
                    <div className="title">
                        <span>Tùy chỉnh đoạn chat</span>
                        <img src="/arrowUp.png" alt=""/>
                    </div>
                </div>
                <div className="option">
                    <div className="title">
                        <span>Quyền riêng tư & hỗ trợ</span>
                        <img src="/arrowUp.png" alt=""/>
                    </div>
                </div>
                <div className="option">
                    <div className="title">
                        <span>Chia sẻ</span>
                        <img src="/arrowUp.png" alt=""/>
                    </div>
                </div>
                <div className="option">
                    <div className="title">
                        <span>File phương tiện</span>
                        <img src="/arrowDown.png" alt=""/>
                    </div>
                    <div className="photos">
                        <div className="photoItem">
                            <div className="photoDetail">
                                <img
                                    src="https://scontent.fsgn4-1.fna.fbcdn.net/v/t39.30808-6/448839707_984915886354727_5128022529440101055_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeGDKerHQJtjNom2Xp2NGrwn-Aw-xZTJspz4DD7FlMmynIZ_QeGu1m7OZ3PpJcdy3N0iPNLkFrQRJEnyYRzkN1HC&_nc_ohc=652BL-yu8eUQ7kNvgGqtneO&_nc_ht=scontent.fsgn4-1.fna&oh=00_AYCFhFxa2kS32uDZcpW9dkLZZuiAHCGODE7IWbRvyn22bQ&oe=667B32C8"
                                    alt=""
                                />
                                <span>Hanari_rys.png</span>
                            </div>
                            <img src="/download.png" alt="" className="icon"/>
                        </div>
                        <div className="photoItem">
                            <div className="photoDetail">
                                <img
                                    src="https://scontent.fsgn4-1.fna.fbcdn.net/v/t39.30808-6/448830145_984915906354725_5433971897066731412_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeEIrVIKq1dQ2WczjQ-gOIyZBT2B9ylEijIFPYH3KUSKMlzIlyqetO7HQKnd6eiYD6cYyu_pz0aNzSa9hYRMqG0b&_nc_ohc=dbKc_j5GGiEQ7kNvgEIHifQ&_nc_ht=scontent.fsgn4-1.fna&oh=00_AYBEjPGUgW1OdbGPcPxjd1H-onPc6QjjbqzHyQhz9ZbEsw&oe=667B2E84"
                                    alt=""
                                />
                                <span>Hanari_rys.png</span>
                            </div>
                            <img src="/download.png" alt="" className="icon"/>
                        </div>
                        <div className="photoItem">
                            <div className="photoDetail">
                                <img
                                    src="https://scontent.fsgn8-1.fna.fbcdn.net/v/t39.30808-6/448854576_984915929688056_5158938323931329841_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeEzP6dtNQMwUF6C5z7vG7mPoRkpfSK2wrChGSl9IrbCsPOH1636J6DyGhQ88kqmdjHDmN7KmwEYHRXOXCkUxMGg&_nc_ohc=V0fqzTYWUN0Q7kNvgHKAdTG&_nc_ht=scontent.fsgn8-1.fna&oh=00_AYD1uWvLsb4MEdjcEM1IjxStLhRVgmSA32AZfjnDUVGBig&oe=667B4E3E"
                                    alt=""
                                />
                                <span>Hanari_rys.png</span>
                            </div>
                            <img src="/download.png" alt="" className="icon"/>
                        </div>
                        <div className="photoItem">
                            <div className="photoDetail">
                                <img
                                    src="https://scontent.fsgn3-1.fna.fbcdn.net/v/t39.30808-6/448830338_984915893021393_5382979795079448707_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeGEj0J8zyK4wtZgKiTYTj6SCMXYvt3Jv_cIxdi-3cm_92FxfM5Pm1bzYZnd4GtpGzbQxfe3gs5qnS4LD__dwaI4&_nc_ohc=GpswE1IVzbcQ7kNvgHp9_a4&_nc_ht=scontent.fsgn3-1.fna&oh=00_AYArS8_lEO9Wa6lF1s08dN38oLlianRlDD7obHaHLiDKIw&oe=667B5115"
                                    alt=""
                                />
                                <span>Hanari_rys.png</span>
                            </div>
                            <img src="/download.png" alt="" className="icon"/>
                        </div>
                    </div>
                </div>
                <button>Chặn</button>
                <button className="logout">Đăng xuất</button>
            </div>
        </div>
    )
}
export default Detail;