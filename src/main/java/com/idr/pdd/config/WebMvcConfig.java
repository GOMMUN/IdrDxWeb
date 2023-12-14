package com.idr.pdd.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.idr.pdd.interceptor.TokenInterceptor;

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {
	
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new TokenInterceptor())
        		.addPathPatterns(
        				"/monitoring",							// 이상감지모니터링
        				"/workDailyReport",						// 작업일보
        				"/simullator/fairPerformance",			// 공정실적
        				"/simullator/logisticsPerformance",		// 물류실적
        				"/simullator/workerPerformance",		// 작업자실적
        				"/productionplanning",					// 생산계획
        				"/productInformation",					// 제풍정보
        				"/perbyproductplan",					// 생산계획별실적
        				"/perbyprocess",						// 공정별실적
        				"/leadtime",							// LeadTime
        				"/inventory",							// 재고현황
        				"/factoryinfo",							// 회사정보
        				"/supplierinfo",						// 공급업체정보
        				"/materialmaster",						// 자재마스터
        				"/mvinfo",								// 모델/차종정보
        				"/groupshift",							// 작업구분
        				"/workerinfo",							// 작업자구분
        				"/equipmentinfo",						// 설비정보
        				"/storageinfo",							// 창고정보
        				"/logisticsinfo",						// 물류정보
        				"/lineinfo",							// 공정정보
        				"/lotinfo",								// LOT정보
        				"/dvcmodel",							// DVC DATASET 모델링
        				"/datasetdetail",						// 분류 DATASET 상세매핑
        				"/scenario",							// 시나리오별 그룹핑
        				"/dxcube",								// DX VALUE CHAIN CUBE
        				"/dash",								// 대시보드
        				"/workDailySummary",					// 작업일보Summary
        				"/alarmHistoryReport"					// AlaramHistory
        			);								
    }

}