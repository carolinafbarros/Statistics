package org.iStat.api.iConverter;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

import org.iStat.api.iCommon.converter.Converter;
import org.iStat.api.iConverter.ConverteriStatOpenRequest;
import org.iStat.api.iDomain.DocumentiStat;
import org.iStat.api.iStatDataset.request.RequestiStatOpen;
import org.junit.Test;

public class ConverteriStatOpenRequestTest {

    public Converter<RequestiStatOpen, DocumentiStat> converter = new ConverteriStatOpenRequest();
    
    @Test
    public void shouldConverteriStatOpenRequest() throws Exception{

        String fileExpected = "document_1.json";
        
        RequestiStatOpen request = createRequest(fileExpected);
        
        DocumentiStat response = converter.convert(request);
        
        assertNotNull(response);
        assertEquals(fileExpected, response.getId());
        
    }

    private RequestiStatOpen createRequest(String fileName) {

        RequestiStatOpen request = new RequestiStatOpen(
                fileName);
        return request;

    }

}
