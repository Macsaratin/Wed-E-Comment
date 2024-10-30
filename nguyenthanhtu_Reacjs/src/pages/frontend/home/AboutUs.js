import React from 'react';

const About = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 relative overflow-hidden">
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://example.com/your-background-image.jpg')" }}>
                <div className="bg-black bg-opacity-50 h-full w-full flex items-center justify-center">
                    <div className="max-w-2xl w-full bg-white shadow-md rounded-lg p-8 animate-fade-in">
                        <h1 className="text-3xl font-bold text-center mb-6">Giới Thiệu Về Website</h1>
                        <p className="text-gray-700 mb-4">
                            Chào mừng bạn đến với website của chúng tôi! Chúng tôi cung cấp các sản phẩm chất lượng cao và dịch vụ tuyệt vời để phục vụ nhu cầu của bạn.
                        </p>
                        <h2 className="text-2xl font-semibold mb-2">Mục Tiêu</h2>
                        <p className="text-gray-700 mb-4">
                            Mục tiêu của chúng tôi là mang đến cho khách hàng trải nghiệm tốt nhất với các sản phẩm đa dạng và dịch vụ tận tâm.
                        </p>
                        <h2 className="text-2xl font-semibold mb-2">Sản Phẩm</h2>
                        <p className="text-gray-700 mb-4">
                            Chúng tôi cung cấp một loạt các sản phẩm, từ đồ điện tử đến đồ gia dụng, với chất lượng và giá cả hợp lý.
                        </p>
                        <h2 className="text-2xl font-semibold mb-2">Liên Hệ</h2>
                        <p className="text-gray-700 mb-4">
                            Nếu bạn có bất kỳ câu hỏi nào, hãy liên hệ với chúng tôi qua trang Liên Hệ hoặc gửi email tới support@example.com.
                        </p>
                        <div className="text-center mt-6">
                            <a href="/" className="text-blue-500 hover:underline">
                                Trở về Trang Chủ
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
