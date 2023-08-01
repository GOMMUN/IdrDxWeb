package com.idr.pdd.interceptor;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URI;
import java.util.Base64;
import java.util.Base64.Decoder;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class TokenInterceptor implements HandlerInterceptor{

	@Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
		
        // Base64 디코딩 ///////////////////////////////////////////////////
        Decoder decoder = Base64.getDecoder();
        byte[] dec_token = decoder.decode(request.getParameter("token"));
        
        String token = new String(dec_token);
        
        JSONParser jsonParser = new JSONParser();
        JSONObject jsonObject = (JSONObject) jsonParser.parse(token);
        
        String accessToken = (String) jsonObject.get("accessToken");
        String refreshToken = (String) jsonObject.get("refreshToken");
        
        try {	
//	        URI uri = new URI("https://chat.teamply.co.kr/api/v1/oauth/me");        
//	        HttpURLConnection con = (HttpURLConnection) uri.toURL().openConnection();
//	        
//	        con.setRequestMethod("GET");
//	        con.setRequestProperty("Content-Type", "application/json");
//	        
//	        con.setRequestProperty("Authorization", new String("Bearer "+accessToken));
//	        con.setRequestProperty("refresh-token", new String(refreshToken));
//	        
//			con.setConnectTimeout(5000); // 연결 타임아웃 설정(5초) 
//			con.setReadTimeout(5000); // 읽기 타임아웃 설정(5초)
//			con.setDoOutput(true);
//			
//			System.out.println("getResponseMessage():" + con.getResponseMessage()); // 응답 메시지 구하기
//	
//	        BufferedReader br = new BufferedReader(new InputStreamReader(con.getInputStream(),"UTF-8"));
//			StringBuilder res_token = new StringBuilder();
//			String resLine = null;
//			while((resLine = br.readLine()) != null) {
//				res_token.append(resLine.trim());
//			}
//			
//			System.out.println(res_token);
//			
//			String res_data = res_token.toString();
//			jsonObject = (JSONObject) jsonParser.parse(res_data);	
//			System.out.println(jsonObject.get("data"));
			
			request.setAttribute("plant", "KEM");
			
			//TODO 추후 response 받은 데이터에서 공장 정보 받고 비교 필요 
//        	if(plant != null) {
//
//			}else {
//				throw new RuntimeException();
//			}
	
		} catch (Exception e) {
			// TODO: handle exception
			response.sendError(404,"에러"); 
		}

        return HandlerInterceptor.super.preHandle(request, response, handler);
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
        log.debug("==================== END ======================");
        log.debug("===============================================");
        HandlerInterceptor.super.postHandle(request, response, handler, modelAndView);
    }
}



    

