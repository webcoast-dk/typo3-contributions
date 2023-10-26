<?php

declare(strict_types=1);

/*
 * This file is part of the TYPO3 CMS project.
 *
 * It is free software; you can redistribute it and/or modify it under
 * the terms of the GNU General Public License, either version 2
 * of the License, or any later version.
 *
 * For the full copyright and license information, please read the
 * LICENSE.txt file that was distributed with this source code.
 *
 * The TYPO3 project - inspiring people to share!
 */

namespace TYPO3\CMS\Core\Database\Schema\SchemaManager;

use Doctrine\DBAL\Platforms\OraclePlatform as DoctrineOraclePlatform;
use Doctrine\DBAL\Schema\Column;
use Doctrine\DBAL\Schema\OracleSchemaManager as DoctrineOracleSchemaManager;

/**
 * Extending the doctrine SQLiteSchemaManager to integrate additional processing stuff
 * due to the dropped event system with `doctrine/dbal 4.x`.
 *
 * For example, this is used to process custom doctrine types.
 *
 * Platform specific SchemaManager are extended to manipulate the schema handling. TYPO3 needs to
 *  do that to provide additional doctrine type handling and other workarounds or alignments. Long
 *  time this have been done by using the `doctrine EventManager` to hook into several places, which
 *  no longer exists.
 *
 * @link https://github.com/doctrine/dbal/blob/3.7.x/UPGRADE.md#deprecated-not-setting-a-schema-manager-factory
 * @link https://github.com/doctrine/dbal/blob/3.7.x/UPGRADE.md#deprecated-extension-via-doctrine-event-manager
 *
 * @internal not part of the public Core API.
 */
class OracleSchemaManager extends DoctrineOracleSchemaManager
{
    use CustomDoctrineTypesColumnDefinitionTrait;

    /**
     * Gets Table Column Definition.
     *
     * @param array<string, mixed> $tableColumn
     *
     * @todo Add `array` type to `$tableColumn` argument with doctrine/dbal 4.0 upgrade.
     */
    protected function _getPortableTableColumnDefinition($tableColumn): Column
    {
        /** @var DoctrineOraclePlatform $platform */
        $platform = $this->_platform;
        return $this->processCustomDoctrineTypesColumnDefinition(tableColumn: $tableColumn, platform: $platform)
            ?? parent::_getPortableTableColumnDefinition(tableColumn: $tableColumn);
    }

    /**
     * @todo Migrate usage of this and remove this. Will be removed with doctrine/dbal 4.0.
     */
    public function getDatabasePlatform(): DoctrineOraclePlatform
    {
        /** @var DoctrineOraclePlatform $platform */
        $platform = $this->_platform;
        return $platform;
    }
}
