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
import com.idr.pdd.service.FairPerformanceService;
import com.idr.pdd.service.LogisticsPerformanceService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequestMapping("/simullator/logisticsPerformance")
public class LogisticsPerformanceController {

	private int totalRowCount = 0; // 전체 행 개수
	private int successRowCount = 0; // 성공한 데이터 개수
	private int failRowCount = 0; // 실패한 데이터 개수

	@Autowired
	private LogisticsPerformanceService service;

	@GetMapping("")
	public String init() {
		return "page/logisticsPerformance";
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

			List<LogisticsPerformance> list = new ArrayList<>();

			totalRowCount = sheet.getLastRowNum();

			for (rowIndex = 1; rowIndex < totalRowCount + 1; rowIndex++) {

				LogisticsPerformance domain = new LogisticsPerformance();

				int columnIndex = 0;
				Row row = sheet.getRow(rowIndex);

				for (columnIndex = 0; columnIndex < row.getLastCellNum(); columnIndex++) {

					Cell cell = row.getCell(columnIndex);
					String key = sheet.getRow(0).getCell(columnIndex).toString().replaceAll(" ", "").toUpperCase();

					if (cell != null) {
						if ("회사코드".equals(key)) {
							domain.setFactoryid(cell.toString());
						} else if ("회사명".equals(key)) {
							domain.setFactoryname(cell.toString());
						} else if ("물류ID".equals(key)) {
							domain.setLogisticsid(cell.toString());
						} else if ("물류이름".equals(key)) {
							domain.setLogisticsname(cell.toString());
						} else if ("동작시간".equals(key)) {
							domain.setOperatingtime(cell.toString());
						} else if ("시작시간".equals(key)) {
							domain.setStarttime(cell.toString());
						} else if ("종료시간".equals(key)) {
							domain.setEndtime(cell.toString());
						} else if ("시작장비".equals(key)) {
							domain.setStartingequipment(cell.toString());
						} else if ("도착장비".equals(key)) {
							domain.setEndequipment(cell.toString());
						} else if ("로딩시간".equals(key)) {
							domain.setLoadingtime(cell.toString());
						} else if ("언로딩시간".equals(key)) {
							domain.setUnloadingtime(cell.toString());
						} else if ("동작종류".equals(key)) {
							domain.setActiontype(cell.toString());
						}
					}
				}
				list.add(domain);

			}
			if (list.size() > 0) {
				for (LogisticsPerformance param : list) {
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
