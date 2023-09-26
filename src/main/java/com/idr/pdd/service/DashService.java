package com.idr.pdd.service;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.URL;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
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
   
   public List<List<FairProd>> findAllC(String plant, String material){
	   

	      List<String> lineList = new ArrayList<>();
	      List<List<FairProd>> finalresult = new ArrayList<>();

//	      if (plant.equals("KEM")) {
//	    	  finalresult.add(mapper.findAllC("KEM-P0002", material));
//	    	  finalresult.add(mapper.findAllC("KEM-P0003", material));
//	    	  finalresult.add(mapper.findAllC("KEM-P0008", material));
//	    	  finalresult.add(mapper.findAllC("KEM-P0005", material));
//	      } else {
	    	  List<String> rank2 = mapper.rank2(plant, "day");
	    	  
	    	  if (rank2.size() > 4) {
	    	      lineList.add(rank2.get(0));
	    	      lineList.add(rank2.get(1));
	    	      lineList.add(rank2.get(rank2.size() - 2));
	    	      lineList.add(rank2.get(rank2.size() - 1));
	    	      finalresult.add(mapper.findAllC(lineList.get(0), material));
	    	      finalresult.add(mapper.findAllC(lineList.get(1), material));
	    	      finalresult.add(mapper.findAllC(lineList.get(2), material));
	    	      finalresult.add(mapper.findAllC(lineList.get(3), material));
	    	  } else {
	    	      for (String line : rank2) {
	    	         finalresult.add(mapper.findAllC(line, material));
	    	      }
	    	  }
//	      }

	      return finalresult;
	   }
   
   public List<FairProd> findAllD(String plant, String material){
      
      return mapper.findAllD(plant, material);
   }

   public List<List<FairProd>> chart1(String plant, String month, String material) {


      List<String> lineList = new ArrayList<>();
      List<List<FairProd>> finalresult = new ArrayList<>();

      if (plant.equals("KEM")) {
    	  finalresult.add(mapper.chart1("KEM-P0002", month, material));
    	  finalresult.add(mapper.chart1("KEM-P0003", month, material));
    	  finalresult.add(mapper.chart1("KEM-P0008", month, material));
    	  finalresult.add(mapper.chart1("KEM-P0005", month, material));
      } else {
    	  List<String> rank = mapper.rank(plant, month);
    	  
    	  if (rank.size() > 4) {
    	      lineList.add(rank.get(0));
    	      lineList.add(rank.get(1));
    	      lineList.add(rank.get(rank.size() - 2));
    	      lineList.add(rank.get(rank.size() - 1));
    	      finalresult.add(mapper.chart1(lineList.get(0), month, material));
    	      finalresult.add(mapper.chart1(lineList.get(1), month, material));
    	      finalresult.add(mapper.chart1(lineList.get(2), month, material));
    	      finalresult.add(mapper.chart1(lineList.get(3), month, material));
    	  } else {
    	      for (String line : rank) {
    	         finalresult.add(mapper.chart1(line, month, material));
    	      }
    	  }
      }

      return finalresult;
   }
   
   public List<List<FairProd>> chart2(String plant, String factory, String month) {

      List<String> rank = mapper.rank(factory, month);

      List<List<FairProd>> finalresult = new ArrayList<>();

      if (plant.equals("KEM")) {   //대표기업 로그인
         if (factory.equals("LHO")) {
            finalresult.add(mapper.chart2(rank.get(0), month));
         } else if (factory.equals("SWH")) {
            finalresult.add(mapper.chart2(rank.get(0), month));   
         } else if (factory.equals("SYM")) {
            finalresult.add(mapper.chart2(rank.get(0), month));   
         } 
      }else {   //협력사 로그인
         rank = mapper.rank(plant, month);
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
   
   public List<List<FairProd>> chart5(String plant, String month, String material) {

	      List<String> lineList = new ArrayList<>();
	      List<List<FairProd>> finalresult = new ArrayList<>();

//	      if (plant.equals("KEM")) {
//	    	  finalresult.add(mapper.chart5("KEM-P0002", month, material));
//	    	  finalresult.add(mapper.chart5("KEM-P0003", month, material));
//	    	  finalresult.add(mapper.chart5("KEM-P0008", month, material));
//	    	  finalresult.add(mapper.chart5("KEM-P0005", month, material));
//	      } else {
	    	  List<String> rank2 = mapper.rank2(plant, month);
	    	  
	    	  if (rank2.size() > 4) {
	    	      lineList.add(rank2.get(0));
	    	      lineList.add(rank2.get(1));
	    	      lineList.add(rank2.get(rank2.size() - 2));
	    	      lineList.add(rank2.get(rank2.size() - 1));
	    	      finalresult.add(mapper.chart5(lineList.get(0), month, material));
	    	      finalresult.add(mapper.chart5(lineList.get(1), month, material));
	    	      finalresult.add(mapper.chart5(lineList.get(2), month, material));
	    	      finalresult.add(mapper.chart5(lineList.get(3), month, material));
	    	  } else {
	    	      for (String line : rank2) {
	    	         finalresult.add(mapper.chart5(line, month, material));
	    	      }
	    	  }
//	      }

	      return finalresult;
	   }
   
   public List<FairProd> chart6(String plant, String month, String material) {

      return mapper.chart6(plant, month, material);
   }

   public String chart7() throws Exception{

      JSONObject jsonObject = callApi();
      
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
   
   public String chart8(String month) throws Exception{

      JSONObject jsonObject = callApi();
      
      // JSON 객체에서 month 값을 가져와서 JSON 배열로 변환
      JSONArray dayArray = (JSONArray) jsonObject.get(month);
      System.out.println("###############"+dayArray);
      
      
      
      // 결과 문자열을 저장할 StringBuilder 생성
        StringBuilder result = new StringBuilder();

        // 각 객체를 순회하면서 word 값을 count 만큼 추가
        for (int i = 0; i < dayArray.size(); i++) {
            JSONObject jsonObj = (JSONObject) dayArray.get(i);
            int count = Integer.parseInt((String) jsonObj.get("count"));
            String word = (String) jsonObj.get("word");

            // count 만큼 word를 결과 문자열에 추가
            for (int j = 0; j < count; j++) {
                result.append(word+" ");
            }
        }

        System.out.println("result :"+result);
        
      return result.toString();
   }
   
   public ArrayList<JSONObject> chart9(String month) throws Exception{
      
      JSONObject jsonObject = callApi();
      
      // JSON 객체에서 month 값을 가져와서 JSON 배열로 변환
      JSONArray dayArray = (JSONArray) jsonObject.get(month);
      System.out.println("###############"+dayArray);
      
       // JSON 데이터를 Java 객체로 변환하여 리스트에 저장
        List<JSONObject> jsonObjects = new ArrayList<>();
        for (int i = 0; i < dayArray.size(); i++) {
            jsonObjects.add((JSONObject) dayArray.get(i));
        }

        // count를 기준으로 내림차순으로 정렬
        Collections.sort(jsonObjects, new Comparator<JSONObject>() {
            @Override
            public int compare(JSONObject o1, JSONObject o2) {
                try {
                    int count1 = Integer.parseInt((String) o1.get("count"));
                    int count2 = Integer.parseInt((String) o2.get("count"));
                    return count2 - count1;
                } catch (Exception e) {
                    e.printStackTrace();
                    return 0;
                }
            }
        });

        ArrayList<JSONObject> arrayJson = new ArrayList<JSONObject>();
        
        // 상위 6개 데이터 추출
	    int numberOfItemsToExtract = Math.min(6, jsonObjects.size());
	    for (int i = 0; i < numberOfItemsToExtract; i++) {
	        JSONObject jsonObjectTop = jsonObjects.get(i);
	        System.out.println("jsonObjectTop"+jsonObjectTop);
	            
	        arrayJson.add(jsonObjectTop);
	    }
      
      return arrayJson;
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
   
   public JSONObject callApi() throws Exception{

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
      
      JSONParser jsonParser = new JSONParser();
      String res_data = ret.toString();
      JSONObject jsonObject = (JSONObject) jsonParser.parse(res_data);   
      
      jsonObject = (JSONObject) jsonParser.parse(((JSONObject) jsonParser.parse(res_data)).get("data").toString());
      System.out.println(jsonObject.get("month"));
      System.out.println(jsonObject.get("day"));
      
      return jsonObject;
   }
}