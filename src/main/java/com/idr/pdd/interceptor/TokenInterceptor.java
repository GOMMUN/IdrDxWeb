package com.idr.pdd.interceptor;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URI;
import java.net.URL;
import java.util.Base64;
import java.util.Base64.Decoder;

import javax.net.ssl.HttpsURLConnection;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import javassist.NotFoundException;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class TokenInterceptor implements HandlerInterceptor{

	@Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        
        try {
        	
        	// Base64 디코딩 ///////////////////////////////////////////////////
            Decoder decoder = Base64.getDecoder();
            byte[] dec_token = decoder.decode(request.getParameter("token"));
            
            String token = new String(dec_token);
            
            JSONParser jsonParser = new JSONParser();
            JSONObject jsonObject = (JSONObject) jsonParser.parse(token);
            
            String accessToken = (String) jsonObject.get("accessToken");
            String refreshToken = (String) jsonObject.get("refreshToken");
            
            
            URL url = null;
            HttpsURLConnection conn = null;
            String ret = new String();
            
        	url = new URL("https://chat.teamply.co.kr/api/v1/oauth/me");
        	
        	conn = (HttpsURLConnection)url.openConnection();
        	conn.setDoInput(true);
        	
        	conn.setRequestMethod("GET");
        	conn.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
        	
        	conn.setRequestProperty("Authorization", "Bearer "+accessToken);
 			conn.setRequestProperty("refresh-token", refreshToken);
 			
 			conn.setDoOutput(true);
 			
 			BufferedReader br = null;
 			br = new BufferedReader(new InputStreamReader(conn.getInputStream()));  // BufferedReader객체 생성
			
 			String input = null;
 			
			//데이터를 읽어드림
            while ((input = br.readLine()) != null){
            	ret += input;
            }
	
			br.close();
			
			System.out.println(ret);
			
			String res_data = ret.toString();
			jsonObject = (JSONObject) jsonParser.parse(res_data);	
			System.out.println(jsonObject.get("data"));
			
			jsonObject = (JSONObject) jsonParser.parse(((JSONObject) jsonParser.parse(res_data)).get("data").toString());
			
			String plant = jsonObject.get("bio").toString();
			String username = jsonObject.get("username").toString();
			
        	if(plant != null) {
        		request.setAttribute("plant", plant);
    			request.setAttribute("username", username);
			}else {
        		throw new RuntimeException();
			}
        	
//        	request.setAttribute("plant", "KEM");
//			request.setAttribute("username", "test2");
        	
        	request.setAttribute("accessToken", accessToken);
			request.setAttribute("refreshToken", refreshToken);
	
		} catch (Exception e) {
			// TODO: handle exception
			response.sendError(404, e.getMessage()); 
		}finally {
//            if (conn != null) {
//            	conn.disconnect();    												// Connection 연결 끊기
//            }
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



    

