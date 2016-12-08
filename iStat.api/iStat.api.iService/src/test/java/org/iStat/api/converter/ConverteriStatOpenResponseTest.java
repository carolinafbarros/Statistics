package org.iStat.api.converter;

import static org.junit.Assert.assertNotNull;

import org.iStat.api.common.converter.Converter;
import org.iStat.api.iConverter.ConverteriStatOpenResponse;
import org.iStat.api.iEntity.DocumentiStat;
import org.iStat.api.iStatIO.response.ResponseiStatOpen;
import org.junit.Test;

public class ConverteriStatOpenResponseTest
        extends AbstractUtilsiServiceTest {

    public Converter<DocumentiStat, ResponseiStatOpen> converter = new ConverteriStatOpenResponse();

    @Test
    public void shouldConverteriStatOpenResponse() {

        String defaultValue = "default";

        DocumentiStat documentiStat = makeDocumentiStat(defaultValue);

        ResponseiStatOpen response = converter.convert(documentiStat);

        assertNotNull(response);

    }
}
