const responseData = {
    // Phản hồi thành công với mã 0000
    in0000Response: (res, data) => {
      res.status(200).json({
        message: 'Success',
        code: '0000',
       
        data: data,
      });
    },
  
    // Phản hồi lỗi hệ thống với mã 9999
    in9999Response: (res) => {
      res.status(500).json({
        message: 'Internal Server Error',
        code: '9999',
        data: null,
      });
    },
  
    // Phản hồi lỗi yêu cầu không hợp lệ với mã 4000
    in4000Response: (res, message = 'Bad Request') => {
      res.status(400).json({
        message: message,
        code: '4000',
        data: null,
      });
    },
  
    // Phản hồi lỗi xác thực với mã 3000
    in3000Response: (res, message = 'Unauthorized') => {
      res.status(401).json({
        message: message,
        code: '3000',
        data: null,
      });
    },
  
    // Phản hồi lỗi không tìm thấy tài nguyên với mã 4040
    in4040Response: (res, message = 'Not Found') => {
      res.status(404).json({
        message: message,
        code: '4040',
        data: null,
      });
    },
  
    // Phản hồi lỗi với mã 5000 cho dịch vụ không khả dụng
    in5000Response: (res, message = 'Service Unavailable') => {
      res.status(503).json({
        message: message,
        code: '5000',
        data: null,
      });
    },
  
    // Kiểm tra mã và phản hồi theo mã lỗi
    checkCode: (code, res, data) => {
      switch (code) {
        case '0000': // Thành công
          responseData.in0000Response(res, data);
          break;
        case '9999': // Lỗi hệ thống
          responseData.in9999Response(res);
          break;
        case '4000': // Lỗi yêu cầu không hợp lệ
          responseData.in4000Response(res);
          break;
        case '3000': // Lỗi xác thực
          responseData.in3000Response(res);
          break;
        case '4040': // Lỗi không tìm thấy
          responseData.in4040Response(res);
          break;
        case '5000': // Lỗi dịch vụ không khả dụng
          responseData.in5000Response(res);
          break;
        default:
          res.status(400).json({
            message: 'Unknown error',
            code: '9999',
            data: null,
          });
      }
    },
  };
  
  export default responseData;
  