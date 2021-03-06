package org.iStat.api.iConverter;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNull;

import org.iStat.api.iCommon.converter.Converter;
import org.iStat.api.iConverter.ConverteriStatCalResponse;
import org.iStat.api.iStatCalc.response.ResponseiStatCalc;
import org.junit.Test;

public class ConverteriStatCalResponseTest {

    public Converter<Float, ResponseiStatCalc> converter = new ConverteriStatCalResponse();

    @Test
    public void shouldConvertDomainToResponseiStatCal() throws Exception{

        ResponseiStatCalc responseExpected = new ResponseiStatCalc(
                Float.valueOf(10.0f));

        ResponseiStatCalc response = converter
            .convert(Float.valueOf(10.0f));

        assertEquals(responseExpected.getResult(),
                response.getResult());
        assertNull(response.getStatus());

    }

}
