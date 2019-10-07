<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    version="2.0">
    
    <xsl:output method="xhtml" encoding="UTF-8" indent="yes"/>
    
    <xsl:template match="/">
        <xsl:result-document href="website/index.html">
            <html>
                <head>
                    <title>Arqueossitios</title>
                    <meta charset="UTF-8"/>
                    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"/>
                </head>
                <body>
                    <h1>Arqueossitios</h1>
                    <h3>Índice:</h3>
                    <ol>
                        <xsl:apply-templates mode="indice"/>
                    </ol>
                </body>
            </html>
        </xsl:result-document>
        <xsl:apply-templates/>
    </xsl:template>
    
        <xsl:template match="ARQELEM" mode="indice">
            <li>
                <a name="{generate-id()}"/>
                <a href="arquiossito-{generate-id()}.html"><xsl:value-of select="IDENTI"/></a>
            </li>
        </xsl:template>
    
        <xsl:template match="ARQELEM">
            <xsl:result-document href="website/arquiossito-{generate-id()}.html">
                <html>
                    <head>
                        <title>Arquiossitio</title>
                        <meta charset="UTF-8"/>
                        <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"/>
                    </head>
                    <body>
                        <table class="w3-table">
                            <tr>
                                <th>IDENTI</th><td><xsl:value-of select="IDENTI"/></td>
                            </tr>
                            <tr>
                                <th>DESCRI</th><td><xsl:value-of select="DESCRI"/></td>
                            </tr>
                            <tr>
                                <th>LUGAR</th><td><xsl:value-of select="LUGAR"/></td>
                            </tr>
                            <tr>
                                <th>FREGUE</th><td><xsl:value-of select="FREGUE"/></td>
                            </tr>
                            <tr>
                                <th>CONCEL</th><td><xsl:value-of select="CONCEL"/></td>
                            </tr>
                            <tr>
                                <th>CODADM</th><td><xsl:value-of select="CODADM"/></td>
                            </tr>
                            <tr>
                                <th>LATITU</th><td><xsl:value-of select="LATITU"/></td>
                            </tr>
                            <tr>
                                <th>LONGIT</th><td><xsl:value-of select="LONGIT"/></td>
                            </tr>
                            <tr>
                                <th>ALTITU</th><td><xsl:value-of select="ALTITU"/></td>
                            </tr>
                            <tr>
                                <th>ACESSO</th><td><xsl:value-of select="ACESSO"/></td>
                            </tr>
                            <tr>
                                <th>QUADRO</th><td><xsl:value-of select="QUADRO"/></td>
                            </tr>
                            <tr>
                                <th>DESARQ</th><td><xsl:value-of select="DESARQ"/></td>
                            </tr>
                            <tr>
                                <th>INTERP</th><td><xsl:value-of select="INTERP"/></td>
                            </tr>
                            <tr>
                                <th>DEPOSI</th><td><xsl:value-of select="DEPOSI"/></td>
                            </tr>
                            <tr>
                                <th>BIBLIO</th><td><xsl:value-of select="BIBLIO"/></td>
                            </tr>
                            <tr>
                                <th>AUTOR</th><td><xsl:value-of select="AUTOR"/></td>
                            </tr>
                            <tr>
                                <th>DATA</th><td><xsl:value-of select="DATA"/></td>
                            </tr>
                        </table>
                        <hr/>
                        <address>
                            <a href="index.html#{generate-id()}">Voltar ao Índice</a>
                        </address>
                    </body>
                </html>
            </xsl:result-document>
        </xsl:template>
    
</xsl:stylesheet>