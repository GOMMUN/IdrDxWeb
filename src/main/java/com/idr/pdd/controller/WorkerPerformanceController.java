package com.idr.pdd.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.idr.pdd.common.ExcelFileType;
import com.idr.pdd.dto.FairPerformance;
import com.idr.pdd.dto.LogisticsPerformance;
import com.idr.pdd.dto.WorkerPerformance;
import com.idr.pdd.service.FairPerformanceService;
import com.idr.pdd.service.LogisticsPerformanceService;
import com.idr.pdd.service.WorkerPerformanceService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequestMapping("/simullator/workerPerformance")
public class WorkerPerformanceController {
	private int totalRowCount = 0; // 전체 행 개수
	private int successRowCount = 0; // 성공한 데이터 개수
	private int failRowCount = 0; // 실패한 데이터 개수

	@Autowired
	private WorkerPerformanceService service;

	@GetMapping("")
	public String init() {
		return "page/workerPerformance";
	}

	@ResponseBody
	@GetMapping("/find")
	public Map<String, Object> find(String search, int offset, int limit) {
		return service.find(search, offset, limit);
	}

	@Transactional
	@PostMapping(value = "/excelUpload")
	public void excelUpload(HttpServletRequest request, HttpServletResponse response, 
			@RequestParam(value = "excelFile", required = true) MultipartFile file) {
		System.out.println(file);
		
		try {
			String extension = file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf(".") + 1);
			
			if (!extension.equals("xlsx") && !extension.equals("xls")) {
		      throw new IOException("엑셀파일만 업로드 해주세요.");
		    }
			 
			Workbook workbook = ExcelFileType.getWorkbook(file);
			
			Sheet sheet = workbook.getSheetAt(0);
			
			int rowIndex = 0;
			
			List<WorkerPerformance> list = new ArrayList<>();
			
			totalRowCount = sheet.getLastRowNum();
			
			for (rowIndex = 1; rowIndex < totalRowCount + 1; rowIndex++) {
				
				WorkerPerformance domain = new WorkerPerformance();
				
				int columnIndex = 0;
				Row row = sheet.getRow(rowIndex);
				
				for (columnIndex = 0; columnIndex < row.getLastCellNum(); columnIndex++) {
					
					Cell cell = row.getCell(columnIndex);
					String key = sheet.getRow(0).getCell(columnIndex).toString().replaceAll(" ", "").toUpperCase();
					
					if( cell != null ) {
						if("작업자코드".equals(key)) {
							domain.setWorkerid(cell.toString());
						}else if("작업자명".equals(key)) {
							domain.setWorkername(cell.toString());
						}else if("생산계획코드".equals(key)) {
							domain.setOrderid((int)Double.parseDouble(cell.toString()));
						}else if("생산계획명".equals(key)) {
							domain.setOrdername(cell.toString());					
						}else if("자재코드".equals(key)) {
							domain.setItemid((int)Double.parseDouble(cell.toString()));
						}else if("자재명".equals(key)) {
							domain.setItemname(cell.toString());
						}else if("공정코드".equals(key)) {
							domain.setProcessid((int)Double.parseDouble(cell.toString()));
						}else if("공정명".equals(key)) {
							domain.setProcessname(cell.toString());
						}else if("공정시간".equals(key)) {
							domain.setProcesstime(cell.toString());
						}else if("설비코드".equals(key)) {
							domain.setEquipid((int)Double.parseDouble(cell.toString()));
						}else if("설비명".equals(key)) {
							domain.setEquipname(cell.toString());
						}
						else if("시작시간".equals(key)) {
							domain.setStarttime(cell.toString());
						}else if("종료시간".equals(key)) {
							domain.setEndtime(cell.toString());
						}else if("분활종류".equals(key)) {
							domain.setDivisiontype(cell.toString());
						}
					}
				}
				list.add(domain);
				
			}
			if(list.size() > 0) {
				for (WorkerPerformance param : list) {
					service.create(param);
					successRowCount += 1;
				}
			}

			totalRowCount = 0;
			successRowCount = 0;
			
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			failRowCount += 1;
			totalRowCount = 0;
			successRowCount = 0;
		}
	};

	@ResponseBody
	@PostMapping(value = "/excelUploadPercent")
	public String excelUploadPercent() {
		double resultPerc = 0.0;
		resultPerc = ((double) successRowCount / (double) totalRowCount) * 100;

		if (Double.isNaN(resultPerc)) {
			return "0";
		} else {
			return String.format("%.0f", resultPerc);
		}
	}
}