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
import com.idr.pdd.service.FairPerformanceService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequestMapping("/simullator/fairPerformance")
public class FairPerformanceController {

	private int totalRowCount = 0; // 전체 행 개수
	private int successRowCount = 0; // 성공한 데이터 개수
	private int failRowCount = 0; // 실패한 데이터 개수

	@Autowired
	private FairPerformanceService service;

	@GetMapping("")
	public String init() {
		return "page/fairPerformance";
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

			List<FairPerformance> list = new ArrayList<>();

			totalRowCount = sheet.getLastRowNum();

			for (rowIndex = 1; rowIndex < totalRowCount + 1; rowIndex++) {

				FairPerformance domain = new FairPerformance();

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
						} else if ("설비코드".equals(key)) {
							domain.setEquipmentId((int) Double.parseDouble(cell.toString()));
						} else if ("설비명".equals(key)) {
							domain.setEquipmentName(cell.toString());
						} else if ("생산계획코드".equals(key)) {
							domain.setOrderId((int) Double.parseDouble(cell.toString()));
						} else if ("생산계획명".equals(key)) {
							domain.setOrderName(cell.toString());
						} else if ("자재코드".equals(key)) {
							domain.setItemId((int) Double.parseDouble(cell.toString()));
						} else if ("자재명".equals(key)) {
							domain.setItemName(cell.toString());
						} else if ("공정코드".equals(key)) {
							domain.setProcessId((int) Double.parseDouble(cell.toString()));
						} else if ("공정명".equals(key)) {
							domain.setProcessName(cell.toString());
						} else if ("공정시간".equals(key)) {
							domain.setProcessTime(cell.toString());
						} else if ("공정결과".equals(key)) {
							domain.setProcessResult(cell.toString());
						} else if ("시작시간".equals(key)) {
							domain.setStartTime(cell.toString());
						} else if ("종료시간".equals(key)) {
							domain.setEndTime(cell.toString());
						} else if ("공정종류".equals(key)) {
							domain.setProcessType(cell.toString());
						} else if ("분활종류".equals(key)) {
							domain.setSplitType(cell.toString());
						}
					}
				}
				list.add(domain);

			}
			if (list.size() > 0) {
				for (FairPerformance param : list) {
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
