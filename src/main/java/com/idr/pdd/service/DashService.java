package com.idr.pdd.service;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.URL;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import javax.net.ssl.HttpsURLConnection;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.idr.pdd.dto.FairProd;
import com.idr.pdd.mapper.DashMapper;

@Service
public class DashService {

	@Autowired
	DashMapper mapper;
	
	public List<FairProd> findAllName(String plant){
		
		return mapper.findAllName(plant);
	}

	public List<FairProd> findAllP(String plant, String material){
		
		return mapper.findAllP(plant, material);
	}
	
	public List<FairProd> findAllQ(String plant, String material){
		
		return mapper.findAllQ(plant, material);
	}
	
	public List<FairProd> findAllC(String plant, String material){
		
		return mapper.findAllC(plant, material);
	}
	
	public List<FairProd> findAllD(String plant, String material){
		
		return mapper.findAllD(plant, material);
	}

	public List<List<FairProd>> chart15(String plant, String month, String material) {

		List<String> rank = mapper.rank(plant);

		List<String> lineList = new ArrayList<>();
		List<List<FairProd>> finalresult = new ArrayList<>();


		if (rank.size() > 4) {
			lineList.add(rank.get(0));
			lineList.add(rank.get(1));
			lineList.add(rank.get(rank.size() - 2));
			lineList.add(rank.get(rank.size() - 1));
			finalresult.add(mapper.chart15(lineList.get(0), month, material));
			finalresult.add(mapper.chart15(lineList.get(1), month, material));
			finalresult.add(mapper.chart15(lineList.get(2), month, material));
			finalresult.add(mapper.chart15(lineList.get(3), month, material));
		} else {
			for (String line : rank) {
				finalresult.add(mapper.chart15(line, month, material));
			}
		}

		return finalresult;
	}
	
	public List<List<FairProd>> chart2(String plant, String factory, String month) {

		List<String> rank = mapper.rank(factory);

		List<List<FairProd>> finalresult = new ArrayList<>();

		if (plant.equals("KEM")) {	//대표기업 로그인
			if (factory.equals("LHO")) {
				finalresult.add(mapper.chart2(rank.get(0), month));
			} else if (factory.equals("SWH")) {
				finalresult.add(mapper.chart2(rank.get(0), month));	
			} else if (factory.equals("SYM")) {
				finalresult.add(mapper.chart2(rank.get(0), month));	
			} 
		}else {	//협력사 로그인
			rank = mapper.rank(plant);
			finalresult.add(mapper.chart2(rank.get(0), month));	
		}
		

		return finalresult;
	}
	
	public List<FairProd> chart3(String plant, String month, String material) {
		
		return mapper.chart3(plant, month, material);
	}
	
	public List<FairProd> chart4(String plant, String month, String material) {
		
		return mapper.chart4(plant, month, material);
	}
	
	public List<FairProd> chart6(String plant, String month, String material) {

		return mapper.chart6(plant, month, material);
	}

	public String chart7() throws Exception{

      URL url = null;
      HttpsURLConnection conn = null;
      String ret = new String();
      
      url = new URL("https://chat.teamply.co.kr/api/v1/smart/alarm/count");
  	
      conn = (HttpsURLConnection)url.openConnection();
      conn.setDoInput(true);

      conn.setRequestMethod("GET");
      conn.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
		
      conn.setDoOutput(true);
		
      BufferedReader br = null;
      br = new BufferedReader(new InputStreamReader(conn.getInputStream()));  // BufferedReader객체 생성
		
      String input = null;
		
      //데이터를 읽어드림
      while ((input = br.readLine()) != null){
      	ret += input;
      }

		br.close();
		
		System.out.println("###############"+ret);
		
		JSONParser jsonParser = new JSONParser();
		String res_data = ret.toString();
		JSONObject jsonObject = (JSONObject) jsonParser.parse(res_data);	
		
		jsonObject = (JSONObject) jsonParser.parse(((JSONObject) jsonParser.parse(res_data)).get("data").toString());
		System.out.println(jsonObject.get("month"));
		System.out.println(jsonObject.get("day"));
		
		// JSON 객체에서 "day" 필드 값을 가져와서 JSON 배열로 변환
		JSONArray dayArray = (JSONArray) jsonObject.get("day");
		
		// 합계를 저장할 변수
		int totalCount = 0;
		
		// JSON 배열의 각 원소를 int로 변환하고 더하기
		for (Object dayValue : dayArray) {
			JSONObject item = (JSONObject) dayValue;
		    int intValue = Integer.parseInt(item.get("count").toString());
		    totalCount += intValue;
		}
		
		if(jsonObject.get("day") == "[]") {
			return "0";
		}else {
			return String.valueOf(totalCount);
		}
		
	}
	
	public String chart8() throws Exception{

		URL url = null;
		HttpsURLConnection conn = null;
		String ret = new String();
		
		url = new URL("https://chat.teamply.co.kr/api/v1/smart/alarm/count");
		
		conn = (HttpsURLConnection)url.openConnection();
		conn.setDoInput(true);
		
		conn.setRequestMethod("GET");
		conn.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
			
		conn.setDoOutput(true);
			
		BufferedReader br = null;
		br = new BufferedReader(new InputStreamReader(conn.getInputStream()));  // BufferedReader객체 생성
			
		String input = null;
			
		//데이터를 읽어드림
		while ((input = br.readLine()) != null){
			ret += input;
		}
		
		br.close();
			
		System.out.println("###############"+ret);
		
		JSONParser jsonParser = new JSONParser();
		String res_data = ret.toString();
		JSONObject jsonObject = (JSONObject) jsonParser.parse(res_data);	
		
		jsonObject = (JSONObject) jsonParser.parse(((JSONObject) jsonParser.parse(res_data)).get("data").toString());
		System.out.println(jsonObject.get("month"));
		System.out.println(jsonObject.get("day"));
		
		// JSON 객체에서 "day" 필드 값을 가져와서 JSON 배열로 변환
		JSONArray dayArray = (JSONArray) jsonObject.get("day");

		return"";
	}
	
	public String[] chart9() throws Exception{
		
		String[] list =null;
		return list;
	}
	
	public String find1Alarm(){
		return mapper.find1Alarm();
	}
	
	public String find1AlarmConfirm(){
		return mapper.find1AlarmConfirm();
	}
	
	public String find2Alarm(){
		return mapper.find2Alarm();
	}	
	
	public String find2AlarmConfirm(){
		return mapper.find2AlarmConfirm();
	}	

	public String find3Alarm(){
		return mapper.find3Alarm();
	}	
	
	public String find3AlarmConfirm(){
		return mapper.find3AlarmConfirm();
	}

	public List<FairProd> findAllDailyAlarm(){
		
		return mapper.findAllDailyAlarm();
	}
}