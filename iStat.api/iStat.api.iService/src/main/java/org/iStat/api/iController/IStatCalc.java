package org.iStat.api.iController;

import java.util.Objects;

import org.iStat.api.iCommon.converter.Converter;
import org.iStat.api.iDomain.DocumentiStat;
import org.iStat.api.iResponse.StatusEnum;
import org.iStat.api.iService.CalcService;
import org.iStat.api.iStatCalc.request.RequestiStatCalc;
import org.iStat.api.iStatCalc.response.ResponseiStatCalc;
import org.iStat.api.iUtils.ResponseUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/iStatCalc")
public class IStatCalc {

    private final Logger LOGGER = LoggerFactory
        .getLogger(IStatCalc.class);

    @Autowired
    private CalcService calcService;

    @Autowired
    private Converter<RequestiStatCalc, DocumentiStat> converterRequestiStatCalc;

    @Autowired
    private Converter<Float, ResponseiStatCalc> converterResponseiStatCalc;

    /**
     * WebService responsible for calculate the median of list of floats.
     * 
     * URL example:
     * http://localhost:8080/iStatCalc/calculateMedian?valuesToCalc=1;3.0
     * 
     * @param valuesToCalc
     *            - List of floats separated with ;
     * @return JSON of status and result
     */
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @RequestMapping(value = "/calculateMedian", consumes = MediaType.APPLICATION_JSON_UTF8_VALUE, produces = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.POST)
    public ResponseEntity<ResponseiStatCalc> calculateMedian(@RequestBody RequestiStatCalc request) {

        ResponseiStatCalc response = new ResponseiStatCalc();

        if (Objects.nonNull(request)) {

            try {
                DocumentiStat documentiStat = converterRequestiStatCalc
                    .convert(request);

                LOGGER.info("'operation=calculateMedian', 'documentiStat={}'", documentiStat);

                Float result = calcService
                    .calculateMedian(documentiStat);

                LOGGER.info("'operation=calculateMedian', 'result={}'", result);

                response = converterResponseiStatCalc.convert(result);
                response.setStatus(ResponseUtils
                    .buildResponseStatus(StatusEnum.SUCCESS));

                return ResponseEntity.ok(response);
            } catch (Exception ex) {
                response.setStatus(ResponseUtils.buildResponseStatus(
                        StatusEnum.UNEXPECTED, "Error message: %s",
                        ex));
                return ResponseEntity
                    .status(HttpStatus.SERVICE_UNAVAILABLE)
                    .body(response);
            }
        } else {
            response.setStatus(ResponseUtils.buildResponseStatus(
                    StatusEnum.UNSUCCESS, "Request object: %s",
                    request));
            LOGGER.info("'operation=calculateMedian', 'response={}'", response);
            return ResponseEntity
                .status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

    /**
     * WebService responsible for calculate the geometric mean of list of
     * floats.
     * 
     * URL example:
     * http://localhost:8080/iStatCalc/calculateGeometricMean?valuesToCalc=4;2;1.0
     * 
     * @param valuesToCalc
     *            - List of floats separated with ;
     * @return JSON of status and result
     */
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @RequestMapping(value = "/calculateGeometricMean", consumes = MediaType.APPLICATION_JSON_UTF8_VALUE, produces = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.POST)
    public ResponseEntity<ResponseiStatCalc> calculateGeometricMean(@RequestBody RequestiStatCalc request) {

        ResponseiStatCalc response = new ResponseiStatCalc();

        if (Objects.nonNull(request)) {

            try {

                DocumentiStat documentiStat = converterRequestiStatCalc
                    .convert(request);

                LOGGER.info("'operation=calculateGeometricMean', 'documentiStat={}'", documentiStat);

                Float result = calcService
                    .calculateGeometricMean(documentiStat);

                LOGGER.info("'operation=calculateGeometricMean', 'result={}'", result);

                response = converterResponseiStatCalc.convert(result);
                response.setStatus(ResponseUtils
                    .buildResponseStatus(StatusEnum.SUCCESS));

                return ResponseEntity.ok(response);
            } catch (Exception ex) {
                response.setStatus(ResponseUtils.buildResponseStatus(
                        StatusEnum.UNEXPECTED, "Error message: %s",
                        ex.getMessage()));
                return ResponseEntity
                    .status(HttpStatus.SERVICE_UNAVAILABLE)
                    .body(response);
            }
        } else {
            response.setStatus(ResponseUtils.buildResponseStatus(
                    StatusEnum.UNSUCCESS, "Request object: %s",
                    request));
            LOGGER.info("'operation=calculateGeometricMean', 'response={}'", response);
            return ResponseEntity
                .status(HttpStatus.BAD_REQUEST).body(response);
        }

    }

    /**
     * WebService responsible for calculate the mode of list of floats.
     * 
     * URL example:
     * http://localhost:8080/iStatCalc/calculateMode?valuesToCalc=3;4;11;11;11;10
     * 
     * @param valuesToCalc
     *            - List of floats separated with ;
     * @return JSON of status and result
     */
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @RequestMapping(value = "/calculateMode", consumes = MediaType.APPLICATION_JSON_UTF8_VALUE, produces = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.POST)
    public ResponseEntity<ResponseiStatCalc> calculateMode(@RequestBody RequestiStatCalc request) {

        ResponseiStatCalc response = new ResponseiStatCalc();

        if (Objects.nonNull(request)) {

            try {

                DocumentiStat documentiStat = converterRequestiStatCalc
                    .convert(request);

                LOGGER.info("'operation=calculateMode', 'documentiStat={}'", documentiStat);

                Float result = calcService
                    .calculateMode(documentiStat);
                LOGGER.info("'operation=calculateMode', 'result={}'", result);

                response = converterResponseiStatCalc.convert(result);
                response.setStatus(ResponseUtils
                    .buildResponseStatus(StatusEnum.SUCCESS));

                return ResponseEntity.ok(response);
            } catch (Exception ex) {
                response.setStatus(ResponseUtils.buildResponseStatus(
                        StatusEnum.UNEXPECTED, "Error message: %s",
                        ex.getMessage()));
                return ResponseEntity
                    .status(HttpStatus.SERVICE_UNAVAILABLE)
                    .body(response);
            }
        } else {
            response.setStatus(ResponseUtils.buildResponseStatus(
                    StatusEnum.UNSUCCESS, "Request object: %s",
                    request));
            LOGGER.info("'operation=calculateMode', 'response={}'", response);
            return ResponseEntity
                .status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

    /**
     * WebService responsible for calculate the midrange of list of floats.
     * 
     * URL example:
     * http://localhost:8080/iStatCalc/calculateMidrange?valuesToCalc=3;4;11;10
     * 
     * @param valuesToCalc
     *            - List of floats separated with ;
     * @return JSON of status and result
     */
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @RequestMapping(value = "/calculateMidrange", produces = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.POST)
    public ResponseEntity<ResponseiStatCalc> calculateMidrange(@RequestBody RequestiStatCalc request) {

        ResponseiStatCalc response = new ResponseiStatCalc();

        if (Objects.nonNull(request)) {

            try {

                DocumentiStat documentiStat = converterRequestiStatCalc
                    .convert(request);
                
                LOGGER.info("'operation=calculateMidrange', 'documentiStat={}'", documentiStat);

                Float result = calcService
                    .calculateMidrange(documentiStat);

                LOGGER.info("'operation=calculateMidrange', 'result={}'", result);

                response = converterResponseiStatCalc.convert(result);
                response.setStatus(ResponseUtils
                    .buildResponseStatus(StatusEnum.SUCCESS));

                return ResponseEntity.ok(response);
            } catch (Exception ex) {
                response.setStatus(ResponseUtils.buildResponseStatus(
                        StatusEnum.UNEXPECTED, "Error message: %s",
                        ex.getMessage()));
                return ResponseEntity
                    .status(HttpStatus.SERVICE_UNAVAILABLE)
                    .body(response);
            }
        } else {
            response.setStatus(ResponseUtils.buildResponseStatus(
                    StatusEnum.UNSUCCESS, "Request object: %s",
                    request));
            LOGGER.info("'operation=calculateMidrange', 'response={}'", response);
            return ResponseEntity
                .status(HttpStatus.BAD_REQUEST).body(response);
        }

    }

    /**
     * WebService responsible for calculate the variance of list of floats.
     * 
     * URL example:
     * http://localhost:8080/iStatCalc/calculateVariance?valuesToCalc=17;15;23;7;9;13
     * 
     * @param valuesToCalc
     *            - List of floats separated with ;
     * @return JSON of status and result
     */
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @RequestMapping(value = "/calculateVariance", consumes = MediaType.APPLICATION_JSON_UTF8_VALUE, produces = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.POST)
    public ResponseEntity<ResponseiStatCalc> calculateVariance(@RequestBody RequestiStatCalc request) {

        ResponseiStatCalc response = new ResponseiStatCalc();

        if (Objects.nonNull(request)) {

            try {

                DocumentiStat documentiStat = converterRequestiStatCalc
                    .convert(request);

                LOGGER.info("'operation=calculateVariance', 'documentiStat={}'", documentiStat);
                
                Float result = calcService
                    .calculateVariance(documentiStat);
                LOGGER.info("'operation=calculateVariance', 'result={}'", result);
               
                response = converterResponseiStatCalc.convert(result);
                response.setStatus(ResponseUtils
                    .buildResponseStatus(StatusEnum.SUCCESS));

                return ResponseEntity.ok(response);
            } catch (Exception ex) {
            	response.setStatus(ResponseUtils.buildResponseStatus(
                        StatusEnum.UNEXPECTED, "Error message: %s",
                        ex.getMessage()));
                return ResponseEntity
                    .status(HttpStatus.SERVICE_UNAVAILABLE)
                    .body(response);
            }
        } else {
            response.setStatus(ResponseUtils.buildResponseStatus(
                    StatusEnum.UNSUCCESS, "Request object: %s",
                    request));
            LOGGER.info("'operation=calculateVariance', 'response={}'", response);
            return ResponseEntity
                .status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

    /**
     * WebService responsible for calculate the standard deviation of list of
     * floats.
     * 
     * URL example:
     * http://localhost:8080/iStatCalc/calculateStandardDeviation?valuesToCalc=17;15;23;7;9;13
     * 
     * @param valuesToCalc
     *            - List of floats separated with ;
     * @return JSON of status and result
     */
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @RequestMapping(value = "/calculateStandardDeviation", consumes = MediaType.APPLICATION_JSON_UTF8_VALUE, produces = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.POST)
    public ResponseEntity<ResponseiStatCalc> calculateStandardDeviation(@RequestBody RequestiStatCalc request) {

        ResponseiStatCalc response = new ResponseiStatCalc();

        if (Objects.nonNull(request)) {

            try {

                DocumentiStat documentiStat = converterRequestiStatCalc
                    .convert(request);

                LOGGER.info("'operation=calculateStandardDeviation', 'documentiStat={}'", documentiStat);

                Float result = calcService
                    .calculateStandardDeviation(documentiStat);

                LOGGER.info("'operation=calculateStandardDeviation', 'result={}'", result);

                response = converterResponseiStatCalc.convert(result);
                response.setStatus(ResponseUtils
                    .buildResponseStatus(StatusEnum.SUCCESS));

                return ResponseEntity.ok(response);
            } catch (Exception ex) {
                response.setStatus(ResponseUtils.buildResponseStatus(
                        StatusEnum.UNEXPECTED, "Error message: %s",
                        ex.getMessage()));
                return ResponseEntity
                    .status(HttpStatus.SERVICE_UNAVAILABLE)
                    .body(response);
            }
        } else {
            response.setStatus(ResponseUtils.buildResponseStatus(
                    StatusEnum.UNSUCCESS, "Request object: %s",
                    request));
            LOGGER.info("'operation=calculateStandardDeviation', 'response={}'", response);
            return ResponseEntity
                .status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

    /**
     * WebService responsible for calculate row's and column's total .
     * 
     * URL example:
     * http://localhost:8080/iStatCalc/calculateRowColumnTotal?valuesToCalc=2;10;5;1.0;4.0
     * 
     * @param valuesToCalc
     *            - List of floats separated with ;
     * @return JSON of status and result
     */
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @RequestMapping(value = "/calculateRowColumnTotal", consumes = MediaType.APPLICATION_JSON_UTF8_VALUE, produces = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.POST)
    public ResponseEntity<ResponseiStatCalc> calculateRowColumnTotal(@RequestBody RequestiStatCalc request) {

        ResponseiStatCalc response = new ResponseiStatCalc();

        if (Objects.nonNull(request)) {

            try {

                DocumentiStat documentiStat = converterRequestiStatCalc
                    .convert(request);

                LOGGER.info("'operation=calculateRowColumnTotal', 'documentiStat={}'", documentiStat);

                Float result = calcService
                    .calculateRowColumnTotal(documentiStat);
                LOGGER.info("'operation=calculateRowColumnTotal', 'result={}'", result);

                response = converterResponseiStatCalc.convert(result);
                response.setStatus(ResponseUtils
                    .buildResponseStatus(StatusEnum.SUCCESS));

                return ResponseEntity.ok(response);
            } catch (Exception ex) {
                response.setStatus(ResponseUtils.buildResponseStatus(
                        StatusEnum.UNEXPECTED, "Error message: %s",
                        ex.getMessage()));
                return ResponseEntity
                    .status(HttpStatus.SERVICE_UNAVAILABLE)
                    .body(response);
            }
        } else {
            response.setStatus(ResponseUtils.buildResponseStatus(
                    StatusEnum.UNSUCCESS, "Request object: %s",
                    request));
            LOGGER.info("'operation=calculateRowColumnTotal', 'response={}'", response);
            return ResponseEntity
                .status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

}
